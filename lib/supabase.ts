import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { Session } from "@supabase/supabase-js";
import { NewPoll, Poll } from "./types";

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

export async function createPoll(poll: NewPoll, userId: string) {
  const { data, error } = await supabase
    .from("polls")
    .insert([{ ...poll, created_by: userId }])
    .select();

  if (error) {
    throw error;
  }

  return data;
}

export async function getPolls(): Promise<Poll[]> {
  const { data, error } = await supabase.from("polls").select("*");

  if (error) {
    throw error;
  }

  return data;
}

export async function deletePoll(pollId: number) {
  const { error } = await supabase.from("polls").delete().eq("id", pollId);

  if (error) {
    throw error;
  }
}
