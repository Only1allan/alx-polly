"use server";

import { createClient } from "@/lib/supabase/server";
// import { revalidatePath } from "next/cache"; // Temporarily commented out

// CREATE POLL
export async function createPoll(formData: FormData) {
  const supabase = await createClient();

  const question = formData.get("question") as string;
  const options = formData.getAll("options").filter(Boolean) as string[];

  // Enhanced input validation
  if (!question || question.trim().length < 5 || question.trim().length > 500) {
    return { error: "Question must be between 5 and 500 characters." };
  }

  if (options.length < 2 || options.length > 10) {
    return { error: "Please provide between 2 and 10 options." };
  }

  // Validate each option
  for (const option of options) {
    if (!option || option.trim().length < 1 || option.trim().length > 200) {
      return { error: "Each option must be between 1 and 200 characters." };
    }
  }

  // Get user from session
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) {
    return { error: userError.message };
  }
  if (!user) {
    return { error: "You must be logged in to create a poll." };
  }

  const { error } = await supabase.from("polls").insert([
    {
      user_id: user.id,
      question: question.trim(),
      options: options.map(opt => opt.trim()),
    },
  ]);

  if (error) {
    return { error: error.message };
  }

  // revalidatePath("/polls"); // Temporarily commented out
  return { error: null };
}

// GET USER POLLS
export async function getUserPolls() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { polls: [], error: "Not authenticated" };

  const { data, error } = await supabase
    .from("polls")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) return { polls: [], error: error.message };
  return { polls: data ?? [], error: null };
}

// GET POLL BY ID
export async function getPollById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("polls")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return { poll: null, error: error.message };
  return { poll: data, error: null };
}

// SUBMIT VOTE
export async function submitVote(pollId: string, optionIndex: number) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Validate input
  if (typeof optionIndex !== 'number' || optionIndex < 0) {
    return { error: 'Invalid vote option' };
  }

  // Check if user already voted (prevent duplicate voting)
  if (user) {
    const { data: existingVote } = await supabase
      .from("votes")
      .select("id")
      .eq("poll_id", pollId)
      .eq("user_id", user.id)
      .single();

    if (existingVote) {
      return { error: 'You have already voted on this poll' };
    }
  }

  const { error } = await supabase.from("votes").insert([
    {
      poll_id: pollId,
      user_id: user?.id ?? null,
      option_index: optionIndex,
    },
  ]);

  if (error) return { error: error.message };
  return { error: null };
}

// DELETE POLL
export async function deletePoll(id: string) {
  const supabase = await createClient();
  
  // Get current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  
  if (userError || !user) {
    return { error: "You must be logged in to delete polls." };
  }

  // Check if user is admin (for admin panel) or poll owner
  const isAdmin = user.user_metadata?.role === 'admin' || user.email === 'admin@alxpolly.com';
  
  if (isAdmin) {
    // Admin can delete any poll
    const { error } = await supabase.from("polls").delete().eq("id", id);
    if (error) return { error: error.message };
  } else {
    // Regular users can only delete their own polls
    const { error } = await supabase
      .from("polls")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);
    if (error) return { error: error.message };
  }
  
  // revalidatePath("/polls"); // Temporarily commented out
  return { error: null };
}

// UPDATE POLL
export async function updatePoll(pollId: string, formData: FormData) {
  const supabase = await createClient();

  const question = formData.get("question") as string;
  const options = formData.getAll("options").filter(Boolean) as string[];

  // Enhanced input validation
  if (!question || question.trim().length < 5 || question.trim().length > 500) {
    return { error: "Question must be between 5 and 500 characters." };
  }

  if (options.length < 2 || options.length > 10) {
    return { error: "Please provide between 2 and 10 options." };
  }

  // Validate each option
  for (const option of options) {
    if (!option || option.trim().length < 1 || option.trim().length > 200) {
      return { error: "Each option must be between 1 and 200 characters." };
    }
  }

  // Get user from session
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) {
    return { error: userError.message };
  }
  if (!user) {
    return { error: "You must be logged in to update a poll." };
  }

  // Only allow updating polls owned by the user
  const { error } = await supabase
    .from("polls")
    .update({ 
      question: question.trim(), 
      options: options.map(opt => opt.trim()) 
    })
    .eq("id", pollId)
    .eq("user_id", user.id);

  if (error) {
    return { error: error.message };
  }

  return { error: null };
}
