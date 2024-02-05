import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Form } from '../src/components/Auth/Form';

describe('Form', () => {
  const mockHandleClick = jest.fn();

  beforeEach(() => {
    render(<Form title="Войти" handleClick={mockHandleClick} />);
  });

  it('renders correctly', () => {
    expect(screen.getByPlaceholderText('email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Войти' })).toBeInTheDocument();
  });

  it('calls handleClick with email and password when button is clicked', () => {
    const email = screen.getByPlaceholderText('email');
    const password = screen.getByPlaceholderText('password');
    const button = screen.getByRole('button', { name: 'Войти' });

    fireEvent.change(email, { target: { value: 'user@example.com' } });
    fireEvent.change(password, { target: { value: 'password' } });
    fireEvent.click(button);

    expect(mockHandleClick).toHaveBeenCalledWith(
      'user@example.com',
      'password',
    );
  });
});
