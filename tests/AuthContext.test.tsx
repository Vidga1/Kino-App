import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '../src/components/Auth/AuthContext';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  onAuthStateChanged: jest.fn(),
}));

const mockOnAuthStateChanged = onAuthStateChanged as jest.MockedFunction<
  (
    auth: ReturnType<typeof getAuth>,
    nextOrObserver: (user: User | null) => void,
  ) => () => void
>;

const ConsumerComponent = () => {
  const { currentUser } = useAuth();
  return <div>{currentUser ? currentUser.email : 'No user'}</div>;
};

describe('AuthProvider', () => {
  it('provides the current user to the context', async () => {
    const user = { email: 'test@example.com' } as User;

    mockOnAuthStateChanged.mockImplementation((auth, callback) => {
      callback(user);
      return jest.fn();
    });

    const { getByText } = render(
      <AuthProvider>
        <ConsumerComponent />
      </AuthProvider>,
    );

    await waitFor(() => expect(getByText(user.email!)).toBeTruthy());
  });

  it('handles no user being signed in', async () => {
    mockOnAuthStateChanged.mockImplementation((auth, callback) => {
      callback(null);
      return jest.fn();
    });

    const { getByText } = render(
      <AuthProvider>
        <ConsumerComponent />
      </AuthProvider>,
    );

    await waitFor(() => expect(getByText('No user')).toBeTruthy());
  });
});
