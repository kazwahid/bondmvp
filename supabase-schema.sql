-- Enable UUID extension
-- Visit events table (for analytics + ROI)
CREATE TABLE IF NOT EXISTS visit_events (
  id BIGSERIAL PRIMARY KEY,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE NOT NULL,
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE NOT NULL,
  local_storage_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_visit_events_business ON visit_events(business_id);

ALTER TABLE visit_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS "Public can insert visit events" ON visit_events FOR INSERT WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "Owners can view visit events" ON visit_events FOR SELECT USING (
  business_id IN (SELECT id FROM businesses WHERE user_id = auth.uid())
);


CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Businesses table
CREATE TABLE businesses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  business_name TEXT NOT NULL,
  slug TEXT UNIQUE,
  logo_url TEXT,
  brand_color VARCHAR(7) NOT NULL DEFAULT '#3c2415',
  loyalty_visits_required INTEGER NOT NULL DEFAULT 7,
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS businesses_slug_idx ON businesses(slug) WHERE slug IS NOT NULL;
-- Velocity rule and manager override (MVP)
ALTER TABLE businesses ADD COLUMN IF NOT EXISTS velocity_minutes INTEGER NOT NULL DEFAULT 5;
ALTER TABLE businesses ADD COLUMN IF NOT EXISTS manager_pin TEXT;
-- Custom customer instructions for check-in page
ALTER TABLE businesses ADD COLUMN IF NOT EXISTS customer_instructions TEXT;



-- Customers table
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE NOT NULL,
  local_storage_id TEXT NOT NULL,
  current_visits INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);
-- Optional phone column for binding
ALTER TABLE customers ADD COLUMN IF NOT EXISTS phone TEXT;

-- Referrals table (first-check-in credit)
CREATE TABLE IF NOT EXISTS referrals (
  id BIGSERIAL PRIMARY KEY,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE NOT NULL,
  referrer_customer_id UUID REFERENCES customers(id) ON DELETE CASCADE NOT NULL,
  referred_customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
  token TEXT UNIQUE NOT NULL,
  credited BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_referrals_business ON referrals(business_id);

ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS "Anyone can insert referrals" ON referrals FOR INSERT WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "Anyone can update referrals" ON referrals FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "Owners can view referrals" ON referrals FOR SELECT USING (
  business_id IN (SELECT id FROM businesses WHERE user_id = auth.uid())
);


-- Redemptions table
CREATE TABLE redemptions (
  id BIGSERIAL PRIMARY KEY,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE NOT NULL,
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE NOT NULL,
  redeemed_at TIMESTAMPTZ DEFAULT now()
);

-- Visit events table (for analytics)
CREATE TABLE visit_events (
  id BIGSERIAL PRIMARY KEY,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE NOT NULL,
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE NOT NULL,
  local_storage_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_visit_events_business_id ON visit_events(business_id);

ALTER TABLE visit_events ENABLE ROW LEVEL SECURITY;

-- Public inserts (MVP); owners can read their data
CREATE POLICY "Anyone can insert visit_events" ON visit_events
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Owners can view visit_events" ON visit_events
  FOR SELECT USING (
    business_id IN (SELECT id FROM businesses WHERE user_id = auth.uid())
  );


-- Indexes for performance
CREATE INDEX idx_businesses_user_id ON businesses(user_id);
CREATE INDEX idx_customers_business_id ON customers(business_id);
CREATE INDEX idx_customers_local_storage_id ON customers(local_storage_id);
CREATE INDEX idx_redemptions_business_id ON redemptions(business_id);

-- Row Level Security (RLS) policies
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE redemptions ENABLE ROW LEVEL SECURITY;

-- Business policies
CREATE POLICY "Users can view own businesses" ON businesses
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own businesses" ON businesses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own businesses" ON businesses
  FOR UPDATE USING (auth.uid() = user_id);

-- Public read policy for businesses to power customer page
CREATE POLICY "Anyone can view businesses" ON businesses
  FOR SELECT USING (true);


-- Customer policies (public read for QR code functionality)
CREATE POLICY "Anyone can view customers" ON customers
  FOR SELECT USING (true);

CREATE POLICY "Anyone can insert customers" ON customers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can update customers" ON customers
  FOR UPDATE USING (true);

-- Redemption policies
CREATE POLICY "Business owners can view their redemptions" ON redemptions
  FOR SELECT USING (
    business_id IN (
      SELECT id FROM businesses WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can insert redemptions" ON redemptions
  FOR INSERT WITH CHECK (true);

-- Storage policies for logos
INSERT INTO storage.buckets (id, name, public) VALUES ('logos', 'logos', true);

CREATE POLICY "Anyone can view logos" ON storage.objects
  FOR SELECT USING (bucket_id = 'logos');

CREATE POLICY "Users can upload logos" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'logos');

CREATE POLICY "Users can update their logos" ON storage.objects
  FOR UPDATE USING (bucket_id = 'logos');

-- Atomic referral credit function (idempotent)
CREATE OR REPLACE FUNCTION referral_credit(p_token text, p_referred_customer uuid)
RETURNS json AS $$
DECLARE
  v_ref RECORD;
  v_updated RECORD;
BEGIN
  UPDATE referrals
    SET credited = true,
        referred_customer_id = p_referred_customer
  WHERE token = p_token AND credited = false
  RETURNING business_id, referrer_customer_id
  INTO v_ref;

  IF v_ref IS NULL THEN
    RETURN json_build_object('credited', false, 'reason', 'already_credited_or_not_found');
  END IF;

  UPDATE customers
    SET current_visits = current_visits + 1
  WHERE id = v_ref.referrer_customer_id
  RETURNING id, current_visits INTO v_updated;

  INSERT INTO visit_events (business_id, customer_id, local_storage_id)
    VALUES (v_ref.business_id, v_ref.referrer_customer_id, 'referral');

  RETURN json_build_object('credited', true, 'referrer_customer_id', v_updated.id, 'current_visits', v_updated.current_visits);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION referral_credit(text, uuid) TO anon, authenticated;


-- Rotating QR tokens for anti-fraud (dynamic tokens, short-lived)
CREATE TABLE IF NOT EXISTS qr_tokens (
  token TEXT PRIMARY KEY,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_qr_tokens_business ON qr_tokens(business_id);

ALTER TABLE qr_tokens ENABLE ROW LEVEL SECURITY;
-- Only owners can mint via RPC (table insert blocked directly); anon reads are not required

-- RPC: mint a short-lived token (owner only)
CREATE OR REPLACE FUNCTION mint_qr_token(p_business UUID)
RETURNS TEXT AS $$
DECLARE
  v_user UUID := auth.uid();
  v_owner UUID;
  v_token TEXT := encode(gen_random_bytes(12), 'hex');
BEGIN
  SELECT user_id INTO v_owner FROM businesses WHERE id = p_business;
  IF v_owner IS NULL OR v_owner <> v_user THEN
    RAISE EXCEPTION 'not_owner';
  END IF;
  INSERT INTO qr_tokens(token, business_id, expires_at)
    VALUES (v_token, p_business, now() + interval '90 seconds')
  ON CONFLICT (token) DO NOTHING;
  RETURN v_token;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
GRANT EXECUTE ON FUNCTION mint_qr_token(UUID) TO authenticated;

-- RPC: increment visit with a valid token; optional referral credit when first visit
CREATE OR REPLACE FUNCTION increment_visit_with_token(
  p_business UUID,
  p_customer UUID,
  p_local_storage_id TEXT,
  p_token TEXT,
  p_ref TEXT DEFAULT NULL,
  p_manager_pin TEXT DEFAULT NULL
) RETURNS JSON AS $$
DECLARE
  v_tok RECORD;
  v_before INT;
  v_after INT;
  v_req INT;
  v_ref JSON := NULL;
  v_velo INT;
  v_pin TEXT;
  v_recent TIMESTAMPTZ;
BEGIN
  SELECT * INTO v_tok FROM qr_tokens WHERE token = p_token AND business_id = p_business AND expires_at > now();
  IF v_tok IS NULL THEN
    RAISE EXCEPTION 'invalid_or_expired_token';
  END IF;

  -- Invalidate token immediately after use (one-time)
  DELETE FROM qr_tokens WHERE token = p_token;

  SELECT loyalty_visits_required, velocity_minutes, manager_pin INTO v_req, v_velo, v_pin FROM businesses WHERE id = p_business;
  SELECT current_visits INTO v_before FROM customers WHERE id = p_customer AND business_id = p_business;

  -- Velocity rule: block if same device added within velocity_minutes, unless manager pin matches
  IF p_manager_pin IS DISTINCT FROM v_pin THEN
    SELECT created_at INTO v_recent FROM visit_events
      WHERE business_id = p_business AND local_storage_id = p_local_storage_id
      ORDER BY created_at DESC LIMIT 1;
    IF v_recent IS NOT NULL AND v_velo IS NOT NULL AND now() - v_recent < make_interval(mins => v_velo) THEN
      RAISE EXCEPTION 'velocity_violation';
    END IF;
  END IF;

  UPDATE customers
    SET current_visits = LEAST(COALESCE(current_visits,0) + 1, COALESCE(v_req, 9999))
    WHERE id = p_customer AND business_id = p_business
    RETURNING current_visits INTO v_after;

  INSERT INTO visit_events(business_id, customer_id, local_storage_id)
    VALUES (p_business, p_customer, p_local_storage_id);

  IF p_ref IS NOT NULL AND COALESCE(v_before,0) = 0 THEN
    BEGIN
      v_ref := referral_credit(p_ref, p_customer);
    EXCEPTION WHEN OTHERS THEN
      v_ref := json_build_object('credited', false, 'reason', 'referral_credit_failed');
    END;
  END IF;

  RETURN json_build_object('current_visits', v_after, 'referral', v_ref);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
GRANT EXECUTE ON FUNCTION increment_visit_with_token(UUID, UUID, TEXT, TEXT, TEXT, TEXT) TO anon, authenticated;
