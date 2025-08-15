-- Enable UUID extension
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

-- Customers table
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE NOT NULL,
  local_storage_id TEXT NOT NULL,
  current_visits INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Redemptions table
CREATE TABLE redemptions (
  id BIGSERIAL PRIMARY KEY,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE NOT NULL,
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE NOT NULL,
  redeemed_at TIMESTAMPTZ DEFAULT now()
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