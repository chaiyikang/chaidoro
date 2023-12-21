import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://spardylutlxcgxfmhwbz.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwYXJkeWx1dGx4Y2d4Zm1od2J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk4NDQwMDUsImV4cCI6MjAxNTQyMDAwNX0.bxazhcRXhHajTOaoIJP3enfFxOetpQS-zJJiU2dtVck";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
