import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
// Separate auth storage for customer OTP so it doesn’t interfere with merchant session
export const supabaseCustomer = createClient(supabaseUrl, supabaseAnonKey, { auth: { storageKey: 'bond_customer' } })

// Database Types
export interface Business {
  id: string
  user_id: string
  business_name: string
  logo_url: string | null
  brand_color: string
  loyalty_visits_required: number
  velocity_minutes?: number | null
  manager_pin?: string | null
  customer_instructions?: string | null
  created_at: string
}

export interface Customer {
  id: string
  business_id: string
  local_storage_id: string
  current_visits: number
  phone?: string | null
  created_at: string
}

export interface Redemption {
  id: number
  business_id: string
  customer_id: string
  redeemed_at: string
}

export interface VisitEvent {
  id: number
  business_id: string
  customer_id: string
  local_storage_id: string | null
  created_at: string
}

// Helper functions
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export const getBusiness = async (businessId: string) => {
  const { data, error } = await supabase
    .from('businesses')
    .select('*')
    .eq('id', businessId)
    .maybeSingle()
  if (error) throw error
  return (data as Business) || null
}




export const getBusinessByUserId = async (userId: string) => {
  const { data, error } = await supabase
    .from('businesses')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle()
  if (error) throw error
  return (data as Business) || null
}

export const createBusiness = async (business: Omit<Business, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('businesses')
    .insert(business)
    .select()
    .single()
    
  if (error) throw error
  return data as Business
}



export const uploadLogo = async (file: File, businessId: string) => {
  const fileExt = file.name.split('.').pop()
  const fileName = `${businessId}-logo.${fileExt}`

  const { error } = await supabase.storage
    .from('logos')
    .upload(fileName, file, { upsert: true })

  if (error) throw error

  const { data: { publicUrl } } = supabase.storage
    .from('logos')
    .getPublicUrl(fileName)

  return publicUrl
}

export const uploadLogoForUser = async (file: File, userId: string) => {
  const fileExt = file.name.split('.').pop()
  const fileName = `${userId}-logo.${fileExt}`
  const { error } = await supabase.storage
    .from('logos')
    .upload(fileName, file, { upsert: true })
  if (error) throw error
  const { data: { publicUrl } } = supabase.storage
    .from('logos')
    .getPublicUrl(fileName)
  return publicUrl
}

export const updateBusiness = async (id: string, patch: Partial<Business>) => {
  const { data, error } = await supabase
    .from('businesses')
    .update(patch)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data as Business
}

export const getOrCreateCustomer = async (businessId: string, localStorageId: string) => {
  // Try find existing
  const { data: existing, error: selectError } = await supabase
    .from('customers')
    .select('*')
    .eq('business_id', businessId)
    .eq('local_storage_id', localStorageId)
    .maybeSingle()
  if (selectError) throw selectError
  if (existing) return existing as Customer

  // Create new
  const { data, error } = await supabase
    .from('customers')
    .insert({ business_id: businessId, local_storage_id: localStorageId, current_visits: 0 })
    .select()
    .single()
  if (error) throw error
  return data as Customer
}

export const updateCustomerVisits = async (customerId: string, nextVisits: number) => {
  const { data, error } = await supabase
    .from('customers')
    .update({ current_visits: nextVisits })
    .eq('id', customerId)
    .select()
    .single()
  if (error) throw error
  return data as Customer
}

export const createRedemption = async (businessId: string, customerId: string) => {
  const { data, error } = await supabase
    .from('redemptions')
    .insert({ business_id: businessId, customer_id: customerId })
    .select()
    .single()
  if (error) throw error
  return data as Redemption
}

export const logVisitEvent = async (businessId: string, customerId: string, localStorageId: string) => {
  const { data, error } = await supabase
    .from('visit_events')
    .insert({ business_id: businessId, customer_id: customerId, local_storage_id: localStorageId })
    .select()
    .single()
  if (error) throw error
  return data as VisitEvent
}

export const getStatsForUser = async (userId: string) => {
  const biz = await getBusinessByUserId(userId)
  if (!biz) return { 
    totalVisits: 0, 
    totalCustomers: 0, 
    averageRating: 4.5, 
    monthlyGrowth: 0 
  }
  
  let totalVisits = 0
  let totalCustomers = 0
  
  try {
    // Get total visits
    const { count: visitCount, error: visitError } = await supabase
      .from('visit_events')
      .select('*', { count: 'exact', head: true })
      .eq('business_id', biz.id)
    if (visitError) throw visitError
    totalVisits = visitCount ?? 0
    
    // Get total customers
    const { count: customerCount, error: customerError } = await supabase
      .from('customers')
      .select('*', { count: 'exact', head: true })
      .eq('business_id', biz.id)
    if (customerError) throw customerError
    totalCustomers = customerCount ?? 0
    
  } catch (error) {
    console.error('Error fetching stats:', error)
    // Fallback: sum customers.current_visits for this business
    const { data, error: fallbackError } = await supabase
      .from('customers')
      .select('current_visits')
      .eq('business_id', biz.id)
    if (!fallbackError && data) {
      totalVisits = (data as any[]).reduce((s, r) => s + (r.current_visits || 0), 0)
    }
  }

  // Calculate monthly growth based on actual data
  let monthlyGrowth = 0
  try {
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    
    const { count: recentVisits, error: recentError } = await supabase
      .from('visit_events')
      .select('*', { count: 'exact', head: true })
      .eq('business_id', biz.id)
      .gte('created_at', thirtyDaysAgo.toISOString())
    
    if (!recentError && recentVisits !== null) {
      const previousMonthVisits = Math.max(0, totalVisits - recentVisits)
      monthlyGrowth = previousMonthVisits > 0 ? Math.round(((recentVisits - previousMonthVisits) / previousMonthVisits) * 100) : 0
    }
  } catch (error) {
    console.error('Error calculating monthly growth:', error)
    monthlyGrowth = 0
  }

  return { 
    totalVisits, 
    totalCustomers, 
    averageRating: 4.5, // Placeholder for MVP
    monthlyGrowth 
  }
}

export const getRecentActivity = async (userId: string, limit = 10) => {
  const biz = await getBusinessByUserId(userId)
  if (!biz) return { visits: [], redemptions: [] }
  const { data: visits, error: vErr } = await supabase
    .from('visit_events')
    .select('*')
    .eq('business_id', biz.id)
    .order('created_at', { ascending: false })
    .limit(limit)
  if (vErr) throw vErr
  const { data: reds, error: rErr } = await supabase
    .from('redemptions')
    .select('*')
    .eq('business_id', biz.id)
    .order('redeemed_at', { ascending: false })
    .limit(limit)
  if (rErr) throw rErr
  return { visits: (visits as VisitEvent[]) || [], redemptions: (reds as Redemption[]) || [] }
}
export const sendCustomerOtp = async (phone: string) => {
  const normalized = phone.replace(/[\s-]/g, '')
  const { error } = await supabaseCustomer.auth.signInWithOtp({ phone: normalized })
  if (error) throw error
}

export const verifyCustomerOtp = async (phone: string, token: string) => {
  const { data, error } = await supabaseCustomer.auth.verifyOtp({ type: 'sms', phone, token })
  if (error) throw error
  return data
}

export const upsertCustomerPhone = async (customerId: string, phone: string) => {
  const { data, error } = await supabase
    .from('customers')
    .update({ phone })
    .eq('id', customerId)
    .select()
    .single()
  if (error) throw error
  return data as Customer
}

export const getDailyVisitsForUser = async (userId: string, days = 14) => {
  const biz = await getBusinessByUserId(userId)
  if (!biz) return [] as Array<{ date: string, visits: number }>
  
  const { data, error } = await supabase
    .from('visit_events')
    .select('created_at')
    .eq('business_id', biz.id)
    .gte('created_at', new Date(Date.now() - days*86400000).toISOString())
    .order('created_at', { ascending: true })
  
  if (error) return []
  
  const bucket = new Map<string, number>()
  for (const row of (data as any[])) {
    const d = (row.created_at as string).slice(0,10)
    bucket.set(d, (bucket.get(d) || 0) + 1)
  }
  
  const out: Array<{ date: string, visits: number }> = []
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(Date.now() - i*86400000).toISOString().slice(0,10)
    out.push({ date: d, visits: bucket.get(d) || 0 })
  }
  
  return out
}

// Add function to get recent customers
export const getRecentCustomers = async (userId: string, limit = 5) => {
  const biz = await getBusinessByUserId(userId)
  if (!biz) return []
  
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .eq('business_id', biz.id)
    .order('created_at', { ascending: false })
    .limit(limit)
  
  if (error) return []
  return data as Customer[]
}

// Add function to get recent check-ins
export const getRecentCheckIns = async (userId: string, limit = 10) => {
  const biz = await getBusinessByUserId(userId)
  if (!biz) return []
  
  const { data, error } = await supabase
    .from('visit_events')
    .select('*')
    .eq('business_id', biz.id)
    .order('created_at', { ascending: false })
    .limit(limit)
  
  if (error) return []
  return data as VisitEvent[]
}

export const createReferral = async (businessId: string, referrerCustomerId: string, token: string) => {
  const { data, error } = await supabase
    .from('referrals')
    .insert({ business_id: businessId, referrer_customer_id: referrerCustomerId, token })
    .select()
    .single()
  if (error) throw error
  return data
}

export const markReferralCredited = async (token: string, referredCustomerId: string) => {
  // Prefer RPC if available to ensure atomicity
  try {
    const { data, error } = await supabase.rpc('referral_credit', { p_token: token, p_referred_customer: referredCustomerId })
    if (error) throw error
    return data
  } catch (e) {
    // Fallback: best-effort direct update (non-atomic)
    const { data, error } = await supabase
      .from('referrals')
      .update({ credited: true, referred_customer_id: referredCustomerId })
      .eq('token', token)
      .eq('credited', false)
      .select()
      .single()
    if (error) throw error
    return data
  }
}

export const getCustomerById = async (id: string) => {
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .eq('id', id)
    .maybeSingle()
  if (error) throw error
  return (data as Customer) || null
}

export const mintQrToken = async (businessId: string) => {
  const { data, error } = await supabase.rpc('mint_qr_token', { p_business: businessId })
  if (error) throw error
  return data as string
}

export const incrementVisitWithToken = async (businessId: string, customerId: string, localStorageId: string, token: string, ref?: string|null, managerPin?: string|null) => {
  const { data, error } = await supabase.rpc('increment_visit_with_token', {
    p_business: businessId, p_customer: customerId, p_local_storage_id: localStorageId, p_token: token, p_ref: ref || null, p_manager_pin: managerPin || null
  })

  if (error) throw error
  return data as { current_visits: number, referral?: any }
}

export const getOpenReferralForReferrer = async (businessId: string, referrerCustomerId: string) => {
  const { data, error } = await supabase
    .from('referrals')
    .select('*')
    .eq('business_id', businessId)
    .eq('referrer_customer_id', referrerCustomerId)
    .eq('credited', false)
    .maybeSingle()
  if (error) throw error
  return data as any
}

export const getCustomerActivity = async (businessId: string, customerId: string, limit = 10) => {
  const { data, error } = await supabase
    .from('visit_events')
    .select('created_at, local_storage_id')
    .eq('business_id', businessId)
    .eq('customer_id', customerId)
    .order('created_at', { ascending: false })
    .limit(limit)
  if (error) throw error
  return (data as Array<{ created_at: string, local_storage_id?: string | null }>)
}








