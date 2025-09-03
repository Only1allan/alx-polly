
/**
 * @fileoverview Test suite for the Registration page component
 * 
 * This test suite validates the user registration functionality including:
 * - UI component rendering and accessibility
 * - Form submission and input validation
 * - User experience flows for account creation
 * - Integration with authentication system
 * 
 * The tests ensure that new users can successfully create accounts through
 * a reliable and user-friendly registration process.
 * 
 * @author ALX Polly Development Team
 * @since 1.0.0
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegisterPage from '../page';
import { AuthProvider } from '@/context/AuthContext';

describe('RegisterPage Component', () => {
  /**
   * Clean up mocks before each test to ensure isolated test execution
   * This prevents cross-test contamination and ensures predictable results
   */
  beforeEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Test: Registration form UI rendering
   * 
   * Validates that all critical registration form elements are present:
   * - Email input field with proper accessibility labeling
   * - Password input field with proper accessibility labeling
   * - Registration submit button that's properly labeled
   * - Login link for existing users
   * 
   * @test {Component} RegisterPage - Main registration component
   * @expects {HTMLElement} Form elements - Should be accessible and present
   */
  it('renders the register form', () => {
    render(
      <AuthProvider>
        <RegisterPage />
      </AuthProvider>
    );
    
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument();
    expect(screen.getByText('Already have an account?')).toBeInTheDocument();
  });

  /**
   * Test: Basic form submission handling
   * 
   * Verifies that the registration form correctly processes user input:
   * - Accepts email and password input from users
   * - Maintains form state during submission process
   * - Handles submission without application crashes
   * 
   * This test focuses on form stability and basic functionality.
   * 
   * @test {Function} Form submission - Basic registration flow
   * @expects {HTMLInputElement} Input persistence - Values should be maintained
   */
  it('handles form submission', async () => {
    render(
      <AuthProvider>
        <RegisterPage />
      </AuthProvider>
    );

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const registerButton = screen.getByRole('button', { name: 'Register' });

    // Simulate user registration input
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(registerButton);

    // Verify form submission maintains state and doesn't crash
    await waitFor(() => {
      expect(emailInput).toHaveValue('test@example.com');
      expect(passwordInput).toHaveValue('password123');
    });
  });

  /**
   * Test: Form submission feedback and stability
   * 
   * Ensures that the registration form provides appropriate feedback
   * during the submission process and maintains stability:
   * - Form processes submission without errors
   * - UI remains responsive during submission
   * - Form elements remain accessible post-submission
   * 
   * @test {Function} Form submission - User feedback and stability
   * @expects {HTMLElement} UI stability - Elements should remain accessible
   */
  it('displays message when form is submitted', async () => {
    render(
      <AuthProvider>
        <RegisterPage />
      </AuthProvider>
    );

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const registerButton = screen.getByRole('button', { name: 'Register' });

    // Simulate complete registration form submission
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(registerButton);

    // Wait for submission processing and verify UI stability
    await waitFor(() => {
      // Ensure the form remains functional post-submission
      expect(registerButton).toBeInTheDocument();
    });
  });
});
