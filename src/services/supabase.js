
import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://kmnwkrkoxqesvhwqajrc.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttbndrcmtveHFlc3Zod3FhanJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM2MTE1MTEsImV4cCI6MjAyOTE4NzUxMX0.ZrCoeDyKn8q9Olnr2BIMyPGPHJRFDUt_Lv38a58LpQ0";
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;