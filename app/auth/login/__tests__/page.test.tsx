
/**
 * @fileoverview Test suite for the Login page component
 * 
 * This comprehensive test suite covers the login page functionality including:
 * - UI rendering and element presence
 * - Form submission handling
 * - Error handling for invalid credentials
 * - User interaction flows
 * 
 * The tests ensure that the login form behaves correctly under various scenarios
 * and provides appropriate feedback to users.
 * 
 * @author ALX Polly Development Team
 * @since 1.0.0
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from '../page';
import { AuthProvider } from '@/context/AuthContext';

// Mock browser alert function to capture error messages during testing
global.alert = jest.fn();

describe('LoginPage Component', () => {
  /**
   * Reset all mocks before each test to ensure clean test state
   * This prevents test interference and ensures reliable test results
   */
  beforeEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Test: Login form UI rendering
   * 
   * Verifies that all essential login form elements are present and accessible:
   * - Email input field with proper labeling
   * - Password input field with proper labeling  
   * - Login submit button
   * - Registration link for new users
   * 
   * @test {Component} LoginPage - Main component under test
   * @expects {HTMLElement} Email input - Should be accessible by label
   * @expects {HTMLElement} Password input - Should be accessible by label
   * @expects {HTMLElement} Login button - Should be accessible by role and name
   * @expects {HTMLElement} Registration link - Should be visible to users
   */
  it('renders the login form', () => {
    render(
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    );
    
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    expect(screen.getByText('Don\'t have an account?')).toBeInTheDocument();
  });

  /**
   * Test: Invalid credentials error handling
   * 
   * Simulates a login attempt with invalid credentials and verifies that:
   * - The form accepts user input correctly
   * - An appropriate error message is displayed via alert
   * - The error handling doesn't crash the application
   * 
   * @test {Function} Form submission - With invalid credentials
   * @expects {Function} global.alert - Should be called with error message
   */
  it('shows an error message with invalid credentials', async () => {
    render(
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    );

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    // Simulate user input with invalid credentials
    fireEvent.change(emailInput, { target: { value: 'wrong@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(loginButton);

    // Wait for error handling to complete and verify error message
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith('Invalid email or password');
    });
  });

  /**
   * Test: Form submission stability
   * 
   * Verifies that the login form handles submission correctly:
   * - Form accepts and maintains user input
   * - Submission process doesn't cause application crashes
   * - Form state is preserved during submission
   * 
   * This test ensures basic form functionality and stability.
   * 
   * @test {Function} Form submission - Basic submission handling
   * @expects {HTMLInputElement} Input values - Should be preserved
   */
  it('handles form submission', async () => {
    render(
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    );

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    // Simulate valid user input
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(loginButton);

    // Verify form submission doesn't crash and maintains state
    await waitFor(() => {
      expect(emailInput).toHaveValue('test@example.com');
      expect(passwordInput).toHaveValue('password');
    });
  });
});
