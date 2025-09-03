
/**
 * @fileoverview Test suite for the Authentication redirect page component
 * 
 * This test suite verifies that the main authentication page correctly redirects
 * users to the login page. The authentication flow starts here and routes users
 * to the appropriate authentication form.
 * 
 * @author ALX Polly Development Team
 * @since 1.0.0
 */

import AuthPage from '../page';
import { redirect } from 'next/navigation';

// Mock Next.js navigation to prevent actual redirects during testing
jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

describe('AuthPage Component', () => {
  /**
   * Test: Authentication page redirect functionality
   * 
   * Verifies that when the AuthPage component is rendered, it immediately
   * redirects the user to the login page. This is the expected behavior
   * for the authentication entry point.
   * 
   * @test {Function} AuthPage - Component under test
   * @expects {Function} redirect - Should be called with '/auth/login'
   */
  it('should redirect to /auth/login', () => {
    AuthPage();
    expect(redirect).toHaveBeenCalledWith('/auth/login');
  });
});
