
import { createClient } from '@supabase/supabase-js';

/**
 * SUPABASE CONFIGURATION
 * Connected to project: bzbgspamhedzkbliynvr
 */

const SUPABASE_URL = 'https://bzbgspamhedzkbliynvr.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_GucJtc5JD42EhI1jfvDIXA_3FvdLauJ';

// Validation to ensure client doesn't crash on initialization
const isReady = SUPABASE_URL && SUPABASE_ANON_KEY && !SUPABASE_URL.includes('YOUR_PROJECT_ID');

export const supabase = isReady 
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

/**
 * Helper to check if the user has provided real credentials.
 */
export const isSupabaseConfigured = () => {
  return !!supabase;
};
