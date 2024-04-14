import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AuthPage from '../src/pages/AuthPage';

jest.mock('../src/components/Auth/Login', () => ({
  Login: () => <div>Login form</div>,
}));
jest.mock('../src/components/Auth/SignUp', () => ({
  SignUp: () => <div>SignUp form</div>,
}));

describe('AuthPage', () => {
  it('renders correctly and shows the login form by default', () => {
    render(<AuthPage />);
    expect(screen.getByText('Login form')).toBeInTheDocument();
    expect(screen.queryByText('SignUp form')).toBeNull();
  });

  it('switches to sign up form when clicking "Нет аккаунта"', () => {
    render(<AuthPage />);
    const signUpButton = screen.getByText('Нет аккаунта');
    fireEvent.click(signUpButton);
    expect(screen.getByText('SignUp form')).toBeInTheDocument();
    expect(screen.queryByText('Login form')).toBeNull();
  });

  it('switches back to login form when clicking "Уже есть аккаунт"', () => {
    render(<AuthPage />);
    const signUpButton = screen.getByText('Нет аккаунта');
    fireEvent.click(signUpButton);
    const loginButton = screen.getByText('Уже есть аккаунт');
    fireEvent.click(loginButton);
    expect(screen.getByText('Login form')).toBeInTheDocument();
    expect(screen.queryByText('SignUp form')).toBeNull();
  });
});
