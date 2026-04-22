import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// TypeScript type for your contact_submissions table
export type ContactSubmission = {
    id?: string
    full_name: string
    email: string
    phone?: string
    service_interest?: string
    message?: string
    created_at?: string
    status?: 'new' | 'read' | 'replied' | 'archived'
}