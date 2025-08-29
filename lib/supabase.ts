import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import { Session, SupabaseClient } from '@supabase/supabase-js';

export const supabase = createPagesBrowserClient();

export async function getSession(): Promise<Session | null> {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export async function getUser() {
  const { data } = await supabase.auth.getUser();
  return data.user;
}

export async function signOut() {
  await supabase.auth.signOut();
}
