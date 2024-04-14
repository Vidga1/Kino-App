import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { app } from './firebaseConfig';

const auth = getAuth(app);

export const login = async (email: string, password: string): Promise<void> => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Ошибка при входе: ' + error.message);
    } else {
      console.error('Ошибка при входе:', error);
      throw new Error('Ошибка при входе');
    }
  }
};

export const createUser = async (
  email: string,
  password: string,
): Promise<void> => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Ошибка при регистрации: ' + error.message);
    } else {
      console.error('Ошибка при регистрации:', error);
      throw new Error('Ошибка при регистрации');
    }
  }
};
