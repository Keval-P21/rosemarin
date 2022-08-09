/* eslint-disable testing-library/no-render-in-setup */
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import LoginComponent from '../components/LoginComponent';
import { login } from '../Utils/apiUserService';

jest.mock('../Utils/apiUserService.ts', () => ({
  login: jest.fn(),
}));

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Login function', () => {
  it('should render login inputs for email and password and submit button', () => {
    const setIsAuthenticated = jest.fn();
    render(
      <BrowserRouter>
        <LoginComponent setIsAuthenticated={setIsAuthenticated} />
      </BrowserRouter>
    );
    const emailInput = screen.getByPlaceholderText('Email address');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByRole('button', { name: /Login/i });
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it('email & password inputs should have value of typed text', () => {
    const setIsAuthenticated = jest.fn();
    render(
      <BrowserRouter>
        <LoginComponent setIsAuthenticated={setIsAuthenticated} />
      </BrowserRouter>
    );
    const emailInput = screen.getByPlaceholderText('Email address');
    const passwordInput = screen.getByPlaceholderText('Password');
    userEvent.type(emailInput, 'test@gmail.com');
    userEvent.type(passwordInput, 'password');
    expect(emailInput.value).toBe('test@gmail.com');
    expect(passwordInput.value).toBe('password');
  });

  it('should pass the user credentials to the API', async () => {
    const setIsAuthenticated = jest.fn();
    render(
      <BrowserRouter>
        <LoginComponent setIsAuthenticated={setIsAuthenticated} />
      </BrowserRouter>
    );
    login.mockImplementation(() => ({
      email: 'test@gmail.com',
      password: 'password',
    }));
    const emailInput = screen.getByPlaceholderText('Email address');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByRole('button', { name: /Login/i });

    userEvent.type(emailInput, 'test@gmail.com');
    userEvent.type(passwordInput, 'password');

    await userEvent.click(loginButton);

    expect(login).toHaveBeenCalledWith({
      email: 'test@gmail.com',
      password: 'password',
    });
  });

  it('should setIsAutheticated to true when valid credentials are submitted', async () => {
    const setIsAuthenticated = jest.fn();
    render(
      <BrowserRouter>
        <LoginComponent setIsAuthenticated={setIsAuthenticated} />
      </BrowserRouter>
    );
    login.mockImplementation(() => ({
      email: 'test@gmail.com',
      password: 'password',
    }));
    const emailInput = screen.getByPlaceholderText('Email address');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByRole('button', { name: /Login/i });

    userEvent.type(emailInput, 'test@gmail.com');
    userEvent.type(passwordInput, 'password');

    await userEvent.click(loginButton);

    expect(setIsAuthenticated).toHaveBeenCalledWith(true);
  });

  it('should render error message to user if incorrect credentials are provided', async () => {
    const setIsAuthenticated = jest.fn();
    render(
      <BrowserRouter>
        <LoginComponent setIsAuthenticated={setIsAuthenticated} />
      </BrowserRouter>
    );
    login.mockImplementation(() => ({
      error: 'Incorrect login information.',
    }));
    const emailInput = screen.getByPlaceholderText('Email address');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByRole('button', { name: /Login/i });

    userEvent.type(emailInput, 'test@gmail.com');
    userEvent.type(passwordInput, 'password');

    userEvent.click(loginButton);

    const loginErrorMessage = screen.getByTestId('loginErrorMessage');
    await waitFor(() => {
      expect(loginErrorMessage).toHaveTextContent(
        'Incorrect login information.'
      );
    });
  });

  it('should prevent users from submitting empty fields', () => {
    const setIsAuthenticated = jest.fn();
    render(
      <BrowserRouter>
        <LoginComponent setIsAuthenticated={setIsAuthenticated} />
      </BrowserRouter>
    );

    const loginButton = screen.getByRole('button', { name: /Login/i });
    expect(loginButton).toBeDisabled();

    const emailInput = screen.getByPlaceholderText('Email address');
    userEvent.type(emailInput, 'test@gmail.com');
    expect(loginButton).toBeDisabled();

    userEvent.clear(emailInput);
    const passwordInput = screen.getByPlaceholderText('Password');
    userEvent.type(passwordInput, 'password');
    expect(loginButton).toBeDisabled();
  });
});
