// User types
export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Poll types (matching database schema)
export interface Poll {
  id: string;
  question: string;  // Changed from title to question
  options: string[]; // Array of strings, not PollOption objects
  created_by: string; // Changed from createdBy to created_by (matches DB)
  created_at: string; // Changed from createdAt to created_at (matches DB)
  updated_at?: string; // Added to match DB
}

// Poll option for results display
export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface PollSettings {
  allowMultipleVotes: boolean;
  requireAuthentication: boolean;
}

// Vote types
export interface Vote {
  id: string;
  poll_id: string;  // Changed to match DB schema
  option: string;   // Changed from optionId to option (text)
  voted_by?: string; // Changed from userId to voted_by (matches DB)
  created_at: string; // Changed to match DB
}

// Form types
export interface CreatePollFormData {
  question: string;  // Changed from title to question
  options: string[];
  settings?: PollSettings;
  endDate?: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}