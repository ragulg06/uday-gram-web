import { createClient } from '@supabase/supabase-js';

const supabaseProjectRef = process.env.SUPABASE_PROJECT_REF || "actlmcvilznnzxawiyxs";
const supabaseUrl = process.env.SUPABASE_URL || `https://${supabaseProjectRef}.supabase.co`;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseKey) {
  throw new Error('SUPABASE_KEY must be set');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
