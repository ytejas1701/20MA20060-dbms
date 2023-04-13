const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = 'https://dprcgeamkwoorvlbciev.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwcmNnZWFta3dvb3J2bGJjaWV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA3NzY3MzMsImV4cCI6MTk5NjM1MjczM30.ORPVA8n2ALbTSaRLLYAH4-exEClczLXu0hadfIF_C_o'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
