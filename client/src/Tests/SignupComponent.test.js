/* eslint-disable testing-library/no-render-in-setup */
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import SignupComponent from '../components/SignupComponent';
import { register } from '../Utils/apiUserService.ts';

jest.mock('../Utils/apiUserService.ts', () => ({
  register: jest.fn(),
}));
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Signup function', () => {
  it('should render signup input fields for name, email, password, confirm password and submit button', () => {
    render(
      <BrowserRouter>
        <SignupComponent />
      </BrowserRouter>
    );
    const usernameInput = screen.getByPlaceholderText('Username');
    const emailInput = screen.getByPlaceholderText('Email address');
    const passwordInput = screen.getByPlaceholderText('Password');
    const confirmPasswordInput =
      screen.getByPlaceholderText('Confirm Password');
    const signupButton = screen.getByRole('button', { name: /Signup/i });
    expect(usernameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(signupButton).toBeInTheDocument();
  });

  it('should enter the correct text in input fields', () => {
    render(
      <BrowserRouter>
        <SignupComponent />
      </BrowserRouter>
    );

    const usernameInput = screen.getByPlaceholderText('Username');
    const emailInput = screen.getByPlaceholderText('Email address');
    const passwordInput = screen.getByPlaceholderText('Password');
    const confirmPasswordInput =
      screen.getByPlaceholderText('Confirm Password');
    userEvent.type(usernameInput, 'Keval');
    userEvent.type(emailInput, 'test@gmail.com');
    userEvent.type(passwordInput, 'password');
    userEvent.type(confirmPasswordInput, 'password');
    expect(usernameInput).toHaveValue('Keval');
    expect(emailInput).toHaveValue('test@gmail.com');
    expect(passwordInput).toHaveValue('password');
    expect(confirmPasswordInput).toHaveValue('password');
  });

  it('should pass name, email, password and confirm password as arguments to the submit function and call the register api call', async () => {
    const setIsAuthenticated = jest.fn();
    render(
      <BrowserRouter>
        <SignupComponent setIsAuthenticated={setIsAuthenticated} />
      </BrowserRouter>
    );
    register.mockImplementation(() => ({
      email: 'test2@gmail.com',
      password: 'password',
    }));

    const usernameInput = screen.getByPlaceholderText('Username');
    const emailInput = screen.getByPlaceholderText('Email address');
    const passwordInput = screen.getByPlaceholderText('Password');
    const confirmPasswordInput =
      screen.getByPlaceholderText('Confirm Password');
    const signupButton = screen.getByRole('button', { name: /Signup/i });
    userEvent.type(usernameInput, 'Keval');
    userEvent.type(emailInput, 'test2@gmail.com');
    userEvent.type(passwordInput, 'password');
    userEvent.type(confirmPasswordInput, 'password');
    await userEvent.click(signupButton);
    expect(setIsAuthenticated).toHaveBeenCalledWith(true);
  });

  // Test password compare validation
  it.only('should show error if password and confirm password are not the same', () => {
    render(
      <BrowserRouter>
        <SignupComponent />
      </BrowserRouter>
    );
    const usernameInput = screen.getByPlaceholderText('Username');
    const emailInput = screen.getByPlaceholderText('Email address');
    const passwordInput = screen.getByPlaceholderText('Password');
    const confirmPasswordInput =
      screen.getByPlaceholderText('Confirm Password');
    const signupButton = screen.getByRole('button', { name: /Signup/i });
    userEvent.type(usernameInput, 'Keval');
    userEvent.type(emailInput, 'test@gmail.com');
    userEvent.type(passwordInput, 'password');
    userEvent.type(confirmPasswordInput, 'passwordd');
    userEvent.click(signupButton);
    expect(screen.getByTestId('signupComponentErrorMessage')).toHaveTextContent(
      'Passwords do not match. Please try again.'
    );
  });

  // Test unhappy path
  it('should show error if user already exists', async () => {
    render(
      <BrowserRouter>
        <SignupComponent />
      </BrowserRouter>
    );
    register.mockImplementation(() => ({
      error: 'error',
      message: 'Account already exists.',
    }));
    const usernameInput = screen.getByPlaceholderText('Username');
    const emailInput = screen.getByPlaceholderText('Email address');
    const passwordInput = screen.getByPlaceholderText('Password');
    const confirmPasswordInput =
      screen.getByPlaceholderText('Confirm Password');
    const signupButton = screen.getByRole('button', { name: /Signup/i });
    userEvent.type(usernameInput, 'Keval');
    userEvent.type(emailInput, 'test@gmail.com');
    userEvent.type(passwordInput, 'password');
    userEvent.type(confirmPasswordInput, 'password');
    userEvent.click(signupButton);

    await waitFor(() => {
      expect(
        screen.getByTestId('signupComponentErrorMessage')
      ).toHaveTextContent('Account already exists. Please try again.');
    });
  });
});
