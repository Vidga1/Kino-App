import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { app } from './firebase';

const auth = getAuth(app);

export const login = async (email: string, password: string): Promise<void> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    console.log('Успешный вход:', userCredential.user);
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
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    console.log('Успешная регистрация:', userCredential.user);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Ошибка при регистрации: ' + error.message);
    } else {
      console.error('Ошибка при регистрации:', error);
      throw new Error('Ошибка при регистрации');
    }
  }
};
