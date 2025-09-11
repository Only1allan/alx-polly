"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

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
      created_by: user.id,  // Changed from user_id to created_by
      question: question.trim(),
      options: options.map(opt => opt.trim()),
    },
  ]);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/polls");
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
    .eq("created_by", user.id)  // Changed from user_id to created_by
    .order("created_at", { ascending: false });

  if (error) return { polls: [], error: error.message };
  return { polls: data ?? [], error: null };
}

// GET ALL POLLS (PUBLIC)
export async function getAllPolls() {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("polls")
    .select("*")
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

  // Get the poll to find the option text
  const { data: poll, error: pollError } = await supabase
    .from("polls")
    .select("options")
    .eq("id", pollId)
    .single();

  if (pollError || !poll) {
    return { error: 'Poll not found' };
  }

  if (optionIndex >= poll.options.length) {
    return { error: 'Invalid vote option' };
  }

  const selectedOption = poll.options[optionIndex];

  // Check if user already voted (prevent duplicate voting)
  if (user) {
    const { data: existingVote } = await supabase
      .from("votes")
      .select("id")
      .eq("poll_id", pollId)
      .eq("voted_by", user.id)  // Changed from user_id to voted_by
      .single();

    if (existingVote) {
      return { error: 'You have already voted on this poll' };
    }
  }

  const { error } = await supabase.from("votes").insert([
    {
      poll_id: pollId,
      voted_by: user?.id ?? null,  // Changed from user_id to voted_by
      option: selectedOption,  // Changed from option_index to option (text)
    },
  ]);

  if (error) return { error: error.message };
  return { error: null };
}

// GET POLL RESULTS
export async function getPollResults(pollId: string) {
  const supabase = await createClient();
  
  // Get poll details
  const { data: poll, error: pollError } = await supabase
    .from("polls")
    .select("*")
    .eq("id", pollId)
    .single();

  if (pollError || !poll) {
    return { poll: null, results: null, error: "Poll not found" };
  }

  // Get vote counts for each option
  const { data: votes, error: votesError } = await supabase
    .from("votes")
    .select("option")
    .eq("poll_id", pollId);

  if (votesError) {
    return { poll: null, results: null, error: votesError.message };
  }

  // Count votes for each option
  const voteCounts: Record<string, number> = {};
  poll.options.forEach((option: string) => {
    voteCounts[option] = 0;
  });

  votes?.forEach((vote) => {
    if (voteCounts.hasOwnProperty(vote.option)) {
      voteCounts[vote.option]++;
    }
  });

  const results = poll.options.map((option: string) => ({
    option,
    votes: voteCounts[option] || 0
  }));

  const totalVotes = votes?.length || 0;

  return { 
    poll, 
    results, 
    totalVotes,
    error: null 
  };
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
      .eq("created_by", user.id);  // Changed from user_id to created_by
    if (error) return { error: error.message };
  }
  
  revalidatePath("/polls");
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
    .eq("created_by", user.id);  // Changed from user_id to created_by

  if (error) {
    return { error: error.message };
  }

  return { error: null };
}
