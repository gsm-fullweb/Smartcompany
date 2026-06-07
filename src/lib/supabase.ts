import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables are missing. Using default credentials.')
}

export const supabase = createClient(
  supabaseUrl || 'https://vdhcmaunhbvdwfiobhim.supabase.co',
  supabaseAnonKey || 'sb_publishable_xGX-sszcmVRBHYXBBkb25Q_MGiWSpEw'
)
