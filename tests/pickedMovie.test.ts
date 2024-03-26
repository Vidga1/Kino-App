import {
  saveSelectedMovies,
  loadSelectedMovies,
} from '../src/firebase/pickedMovie';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../src/firebase/firebaseConfig';

jest.mock('firebase/firestore', () => ({
  doc: jest.fn(() => ({})),
  getDoc: jest.fn(),
  setDoc: jest.fn(),
}));

jest.mock('../src/firebase/firebaseConfig', () => ({
  db: {},
}));

describe('saveSelectedMovies', () => {
  it('should call setDoc with correct parameters', async () => {
    const userId = 'testUserId';
    const selectedMovies = {
      '1': {
        nameRu: 'Test Movie',
        ratingKinopoisk: 8.5,
        filmId: 123,
        year: '2020',
        countries: [{ id: '1', country: 'USA' }],
        genres: [{ id: '1', genre: 'Comedy' }],
        rating: 8.5,
      },
    };
    const mockDocRef = {};
    (doc as jest.Mock).mockReturnValue(mockDocRef);

    await saveSelectedMovies(userId, selectedMovies, {});

    expect(doc).toHaveBeenCalledWith(
      db,
      'users',
      userId,
      'data',
      'selectedMovies',
    );
    expect(setDoc).toHaveBeenCalledWith(mockDocRef, { movies: selectedMovies });
  });

  it('should call setDoc with correct parameters for ratings', async () => {
    const userId = 'testUserId';
    const selectedMovies = {};
    const ratings = { movieId1: 8.5 };

    const mockDocRef = {};
    (doc as jest.Mock)
      .mockReturnValueOnce(mockDocRef)
      .mockReturnValueOnce(mockDocRef);

    await saveSelectedMovies(userId, selectedMovies, ratings);

    expect(doc).toHaveBeenNthCalledWith(
      2,
      db,
      'users',
      userId,
      'data',
      'ratings',
    );
    expect(setDoc).toHaveBeenNthCalledWith(2, mockDocRef, { ratings });
  });
});

describe('loadSelectedMovies', () => {
  it('should handle errors', async () => {
    const userId = 'testUserId';
    const mockError = new Error('Failed to load selected movies');
    (getDoc as jest.Mock).mockRejectedValue(mockError);

    await expect(loadSelectedMovies(userId)).rejects.toThrow(
      'Failed to load selected movies',
    );
  });

  it('should successfully load selected movies and ratings', async () => {
    const userId = 'testUserId';
    const selectedMoviesData = { movies: { '1': { nameRu: 'Test Movie' } } };
    const ratingsData = { ratings: { '1': 8.5 } };

    (getDoc as jest.Mock)
      .mockResolvedValueOnce({
        exists: () => true,
        data: () => selectedMoviesData,
      })
      .mockResolvedValueOnce({ exists: () => true, data: () => ratingsData });

    const result = await loadSelectedMovies(userId);

    expect(result).toEqual({
      selectedMovies: selectedMoviesData.movies,
      ratings: ratingsData.ratings,
    });
  });

  it('should return empty objects if no data exists', async () => {
    const userId = 'testUserId';

    (getDoc as jest.Mock)
      .mockResolvedValueOnce({ exists: () => false })
      .mockResolvedValueOnce({ exists: () => false });

    const result = await loadSelectedMovies(userId);

    expect(result).toEqual({
      selectedMovies: {},
      ratings: {},
    });
  });

  it('should throw an error if saving selectedMovies fails', async () => {
    const userId = 'testUserId';
    const selectedMovies = {};
    const ratings = {};
    const mockError = new Error('Failed to save');
    (setDoc as jest.Mock).mockRejectedValue(mockError);

    await expect(
      saveSelectedMovies(userId, selectedMovies, ratings),
    ).rejects.toThrow('Failed to save');
  });
});
