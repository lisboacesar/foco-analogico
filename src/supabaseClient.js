import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://liangktylctwofqqmlje.supabase.co' 
const supabaseKey = 'sb_publishable_R_5_KGeipwqym22UrLKygg_dUtc6gb0'

export const supabase = createClient(supabaseUrl, supabaseKey)