/* eslint-disable testing-library/no-render-in-setup */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import LoginComponent from '../components/LoginComponent';

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

  // jest.mock('../Utils/apiUserService.ts', () => ({
  //   login: () => ({
  //     email: 'test@gmail.com',
  //     password: 'password',
  //   }),
  // }));

  // global.fetch = jest.fn(() =>
  //   Promise.resolve({
  //     json: () =>
  //       Promise.resolve({ email: 'test@gmail.com', password: 'password' }),
  //   })
  // ) as jest.Mock;

  // Check email and password are correctly passed as arguments to the api call
  it('should pass email and password as arguments to the login api call', async () => {

    const setIsAuthenticated = jest.fn();
    render(
      <BrowserRouter>
        <LoginComponent setIsAuthenticated={setIsAuthenticated} />
      </BrowserRouter>
    );


    const emailInput = screen.getByPlaceholderText('Email address');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByRole('button', { name: /Login/i });

    userEvent.type(emailInput, 'test@gmail.com');
    userEvent.type(passwordInput, 'password');

    await userEvent.click(loginButton);

    // expect(setIsAuthenticated).toHaveBeenCalledWith(credentials);
    const dashboard = screen.getByTestId('navbar');
    expect(dashboard).toBeInTheDocument();
    expect(setIsAuthenticated).toHaveBeenCalledWith(true);
  });

  //Happy path - does the state update

  //Happy path - navigate home

  //unhappy path - does the state update; error message Incorrect login information and form reset.

  //validation on form
});
