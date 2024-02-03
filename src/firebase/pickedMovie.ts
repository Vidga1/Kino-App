import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

export const saveSelectedMovies = async (
  userId: string,
  selectedMovies: SelectedMovies,
): Promise<void> => {
  const userDocRef = doc(db, 'users', userId, 'selectedMovies', 'movies');
  await setDoc(userDocRef, selectedMovies);
};

export const loadSelectedMovies = async (
  userId: string,
): Promise<SelectedMovies> => {
  const userDocRef = doc(db, 'users', userId, 'selectedMovies', 'movies');
  const docSnap = await getDoc(userDocRef);

  if (docSnap.exists()) {
    return docSnap.data() as SelectedMovies;
  } else {
    console.log('Нет сохраненных фильмов');
    return {};
  }
};
