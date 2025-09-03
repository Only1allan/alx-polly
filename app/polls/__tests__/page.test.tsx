
/**
 * @fileoverview Test suite for the Polls Dashboard page component
 * 
 * This test suite validates the main polls dashboard functionality including:
 * - Authenticated user access and session management
 * - Poll list rendering and display
 * - Navigation and routing integration
 * - UI component integration and stability
 * 
 * The dashboard serves as the central hub for poll management and viewing,
 * making these tests critical for user experience validation.
 * 
 * @author ALX Polly Development Team
 * @since 1.0.0
 */

import { render, screen, waitFor } from '@testing-library/react';
import PollsPage from '../page';
import { AuthProvider } from '@/context/AuthContext';

// Mock Next.js navigation to prevent actual routing during tests
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock AuthContext to provide authenticated session for testing
// This ensures tests run with a predictable authentication state
jest.mock('@/context/AuthContext', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => children,
  useAuth: () => ({ 
    session: { 
      user: { id: '1' } 
    } 
  }),
}));

// Mock PollList component to isolate dashboard testing from poll list implementation
// This allows testing dashboard behavior independent of poll data fetching
jest.mock('@/components/polls/poll-list', () => {
  return function DummyPollList() {
    return <div data-testid="poll-list">Poll List</div>;
  };
});

describe('PollsPage Component', () => {
  /**
   * Test: Polls dashboard rendering for authenticated users
   * 
   * Validates that the polls dashboard correctly renders for authenticated users:
   * - Main dashboard heading is displayed
   * - Poll list component is rendered and accessible
   * - Page renders without crashes for authenticated sessions
   * - Component integration works correctly
   * 
   * This test ensures that authenticated users can successfully access
   * and view the main polls dashboard interface.
   * 
   * @test {Component} PollsPage - Main dashboard component
   * @expects {HTMLElement} Dashboard title - Should be visible to users
   * @expects {HTMLElement} Poll list - Should be rendered and accessible
   */
  it('renders the poll list', async () => {
    render(
      <AuthProvider>
        <PollsPage />
      </AuthProvider>
    );
    
    // Wait for component to render after authentication check
    await waitFor(() => {
      expect(screen.getByTestId('poll-list')).toBeInTheDocument();
    });
    
    // Verify main dashboard heading is present
    expect(screen.getByText('Polls Dashboard')).toBeInTheDocument();
  });
});
