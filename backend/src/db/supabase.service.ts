import { createClient } from '@supabase/supabase-js';
import { Database } from './supabase.types';

export const supabase = createClient<Database>(
  'https://<id>.supabase.co',
  'secret',
);
