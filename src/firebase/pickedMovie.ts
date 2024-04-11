import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

export const saveSelectedMovies = async (
  userId: string,
  selectedMovies: SelectedMovies,
  ratings: Record<string, number | string>,
): Promise<void> => {
  const moviesDocRef = doc(db, 'users', userId, 'data', 'selectedMovies');
  await setDoc(moviesDocRef, { movies: selectedMovies });

  const ratingsDocRef = doc(db, 'users', userId, 'data', 'ratings');
  await setDoc(ratingsDocRef, { ratings });
};

export const loadSelectedMovies = async (
  userId: string,
): Promise<{
  selectedMovies: SelectedMovies;
  ratings: Record<string, number | string>;
}> => {
  const moviesDocRef = doc(db, 'users', userId, 'data', 'selectedMovies');
  const moviesSnap = await getDoc(moviesDocRef);

  const ratingsDocRef = doc(db, 'users', userId, 'data', 'ratings');
  const ratingsSnap = await getDoc(ratingsDocRef);

  if (moviesSnap.exists() && ratingsSnap.exists()) {
    const selectedMovies = moviesSnap.data().movies as SelectedMovies;
    const ratings = ratingsSnap.data().ratings as Record<
      string,
      number | string
    >;
    return { selectedMovies, ratings };
  } else {
    return { selectedMovies: {}, ratings: {} };
  }
};
