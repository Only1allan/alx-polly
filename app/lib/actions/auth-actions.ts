'use server';

import { createClient } from '@/lib/supabase/server';
import { LoginFormData, RegisterFormData } from '../types';

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password validation: minimum 8 chars, at least one letter, one number, one special char
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export async function login(data: LoginFormData) {
  // Input validation
  if (!data.email || !EMAIL_REGEX.test(data.email)) {
    return { error: 'Invalid credentials' };
  }
  
  if (!data.password) {
    return { error: 'Invalid credentials' };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  // Generic error message to prevent user enumeration
  if (error) {
    return { error: 'Invalid credentials' };
  }

  // Success: no error
  return { error: null };
}

export async function register(data: RegisterFormData) {
  // Input validation
  if (!data.email || !EMAIL_REGEX.test(data.email)) {
    return { error: 'Please provide a valid email address' };
  }
  
  if (!data.password || !PASSWORD_REGEX.test(data.password)) {
    return { error: 'Password must be at least 8 characters with letters, numbers, and special characters' };
  }
  
  if (!data.name || data.name.trim().length < 2) {
    return { error: 'Name must be at least 2 characters long' };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        name: data.name.trim(),
      },
    },
  });

  // Generic error message to prevent user enumeration
  if (error) {
    if (error.message.includes('already registered')) {
      return { error: 'Registration failed. Please try again or contact support.' };
    }
    return { error: 'Registration failed. Please check your information and try again.' };
  }

  // Success: no error
  return { error: null };
}

export async function logout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    return { error: error.message };
  }
  return { error: null };
}

export async function getCurrentUser() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  return data.user;
}

export async function getSession() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getSession();
  return data.session;
}

// Helper function to check if user has admin role
export async function isUserAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return false;
  
  // Check user metadata for admin role
  return user.user_metadata?.role === 'admin' || user.email === 'admin@alxpolly.com';
}
