import { login, createUser } from '../src/firebase/authorization';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

jest.mock('firebase/auth', () => {
  const originalModule = jest.requireActual('firebase/auth');

  return {
    ...originalModule,
    getAuth: jest.fn(() => ({})),
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
  };
});

const mockUserCredential = {
  user: {
    uid: '123',
    email: 'user@example.com',
  },
};

describe('authorization', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('authenticates a user with email and password', async () => {
      (signInWithEmailAndPassword as jest.Mock).mockResolvedValue(
        mockUserCredential,
      );

      await expect(login('user@example.com', 'password123')).resolves.toEqual(
        undefined,
      );
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(),
        'user@example.com',
        'password123',
      );
    });
  });

  describe('createUser', () => {
    it('creates a new user with email and password', async () => {
      (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue(
        mockUserCredential,
      );

      await expect(
        createUser('newuser@example.com', 'password123'),
      ).resolves.toEqual(undefined);
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(),
        'newuser@example.com',
        'password123',
      );
    });
  });
});
