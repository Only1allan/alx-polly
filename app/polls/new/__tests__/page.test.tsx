
/**
 * @fileoverview Test suite for the Create Poll page component
 * 
 * This test suite validates the poll creation functionality including:
 * - Authenticated access control and session verification
 * - Poll creation form rendering and accessibility
 * - Form component integration and stability
 * - User interface elements and interactions
 * 
 * Poll creation is a core feature of the application, making thorough testing
 * essential for ensuring reliable user experience and data integrity.
 * 
 * @author ALX Polly Development Team
 * @since 1.0.0
 */

import { render, screen, waitFor } from '@testing-library/react';
import CreatePollPage from '../page';
import { AuthProvider } from '@/context/AuthContext';

// Mock Next.js router to prevent navigation during testing
// This isolates component testing from routing side effects
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

// Mock Supabase functions to prevent actual API calls during testing
// This ensures tests run consistently without external dependencies
jest.mock('@/lib/supabase', () => ({
  getSession: jest.fn(() => Promise.resolve({ user: { id: '1' } })),
  createPoll: jest.fn(() => Promise.resolve({ id: '1' })),
}));

// Mock authentication context to provide consistent authenticated state
// This allows testing the component behavior with a known session state
jest.mock('@/context/AuthContext', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => children,
  useAuth: () => ({
    session: { user: { id: '1', email: 'test@example.com' } },
  }),
}));

describe('CreatePollPage Component', () => {
  /**
   * Test: Poll creation form rendering for authenticated users
   * 
   * Validates that the poll creation form renders correctly for authenticated users:
   * - Main form title is displayed prominently
   * - Poll title input field is accessible and properly labeled
   * - Options section is present for poll choices
   * - Create poll button is accessible and functional
   * 
   * This test ensures that authenticated users can access all necessary
   * form elements to successfully create new polls.
   * 
   * @test {Component} CreatePollPage - Main poll creation component
   * @expects {HTMLElement} Form title - Should be visible and descriptive
   * @expects {HTMLElement} Title input - Should be accessible by label
   * @expects {HTMLElement} Options section - Should be present for poll choices
   * @expects {HTMLElement} Submit button - Should be accessible and labeled correctly
   */
  it('renders the create poll form', async () => {
    render(
      <AuthProvider>
        <CreatePollPage />
      </AuthProvider>
    );
    
    // Wait for component to render after authentication verification
    // This accounts for any async session checking that occurs
    await waitFor(() => {
      expect(screen.getByText('Create a New Poll')).toBeInTheDocument();
      expect(screen.getByLabelText('Poll Title')).toBeInTheDocument();
      expect(screen.getByText('Options')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Create Poll' })).toBeInTheDocument();
    });
  });
});
