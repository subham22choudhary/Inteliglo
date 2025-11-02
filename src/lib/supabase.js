import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Debug: Check if values loaded (remove after testing)
console.log('Supabase URL:', supabaseUrl)
console.log('Key loaded:', supabaseAnonKey ? 'Yes ✅' : 'No ❌')

export const supabase = createClient(supabaseUrl, supabaseAnonKey)