import { createClient } from '@supabase/supabase-js';
import type { Database } from '@packages/shared-types';

/**
 * Create Supabase client
 * This should be used on the client-side (browser)
 */
export function createSupabaseClient(url: string, anonKey: string) {
  return createClient<Database>(url, anonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
    },
  });
}

/**
 * Create Supabase admin client
 * This should be used on the server-side only
 */
export function createSupabaseAdminClient(url: string, serviceRoleKey: string) {
  return createClient<Database>(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

