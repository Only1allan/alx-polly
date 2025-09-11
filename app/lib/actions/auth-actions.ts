'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password validation: minimum 8 chars, at least one letter, one number, one special char
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export async function login(formData: FormData) {
  const supabase = await createClient();

  // Extract form data
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // Basic validation
  if (!email || !password) {
    return { error: 'Email and password are required' };
  }

  if (!EMAIL_REGEX.test(email)) {
    return { error: 'Please enter a valid email address' };
  }

  if (!PASSWORD_REGEX.test(password)) {
    return { error: 'Password must be at least 8 characters with letters, numbers, and special characters' };
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { error: error.message };
    }

    revalidatePath('/', 'layout');
    redirect('/dashboard/polls');
  } catch (error) {
    return { error: 'An unexpected error occurred. Please try again.' };
  }
}

export async function register(formData: FormData) {
  const supabase = await createClient();

  // Extract form data
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const name = formData.get('name') as string;

  // Basic validation
  if (!email || !password || !name) {
    return { error: 'All fields are required' };
  }

  if (!EMAIL_REGEX.test(email)) {
    return { error: 'Please enter a valid email address' };
  }

  if (!PASSWORD_REGEX.test(password)) {
    return { error: 'Password must be at least 8 characters with letters, numbers, and special characters' };
  }

  if (name.trim().length < 2) {
    return { error: 'Name must be at least 2 characters long' };
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name.trim(),
        },
      },
    });

    if (error) {
      return { error: error.message };
    }

    return { success: 'Registration successful! Please check your email to confirm your account.' };
  } catch (error) {
    return { error: 'An unexpected error occurred. Please try again.' };
  }
}

export async function logout() {
  const supabase = await createClient();

  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return { error: error.message };
    }

    revalidatePath('/', 'layout');
    redirect('/login');
  } catch (error) {
    return { error: 'An unexpected error occurred. Please try again.' };
  }
}
