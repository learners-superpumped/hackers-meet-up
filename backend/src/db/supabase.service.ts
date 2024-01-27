import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://mshltvnsfedpeutojeae.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zaGx0dm5zZmVkcGV1dG9qZWFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYzOTI4MTEsImV4cCI6MjAyMTk2ODgxMX0.mwNoOJpW7X5GrwrUKG_RLkDlW9MiYsmrM7S6JvadSwg',
);

export { supabase };
