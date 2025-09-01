// This file will contain type definitions for the application.
// For example, the Poll type, the User type, etc.

export interface Poll {
  id: number;
  created_at: string;
  question: string;
  options: string[];
  created_by: string;
}

export type NewPoll = Omit<Poll, "id" | "created_at" | "created_by">;
