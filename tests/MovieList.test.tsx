import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MovieList from '../src/components/MovieList/MovieList';
import { db } from '../src/firebase/firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const movies = [
  {
    filmId: 1,
    kinopoiskId: 1,
    nameRu: 'Фильм 1',
    posterUrlPreview: 'https://example.com/poster1.jpg',
    ratingKinopoisk: 7.5,
    year: '2020',
    countries: [{ country: 'США' }],
    genres: [{ genre: 'Комедия' }],
    rating: '7.5',
  },
  {
    filmId: 2,
    kinopoiskId: 2,
    nameRu: 'Фильм 2',
    posterUrlPreview: 'https://example.com/poster2.jpg',
    ratingKinopoisk: 8.0,
    year: '2021',
    countries: [{ country: 'Великобритания' }],
    genres: [{ genre: 'Драма' }],
    rating: '8.0',
  },
];

jest.mock('../src/hooks/UseAuth', () => ({
  useAuth: () => ({ currentUser: { uid: 'testUid' } }),
}));

jest.mock('../src/firebase/firebaseConfig', () => ({
  db: {},
}));

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  doc: jest.fn(),
  getDoc: jest.fn(),
  setDoc: jest.fn(),
}));

(doc as jest.Mock).mockReturnValue('fakeDocumentReference');

(getDoc as jest.Mock).mockResolvedValue({
  exists: () => true,
  data: () => ({
    movies: {
      '1': movies[0],
    },
  }),
});

(setDoc as jest.Mock).mockResolvedValue({
  exists: () => true,
  data: () => ({
    movies: {
      '1': movies[0],
    },
  }),
});

describe('MovieList', () => {
  const movies = [
    {
      filmId: 1,
      nameRu: 'Movie 1',
      posterUrlPreview: 'url1',
      ratingKinopoisk: 7.5,
      year: '2020',
      countries: [{ id: '1', country: 'USA' }],
      genres: [{ id: '1', genre: 'Comedy' }],
      rating: 7.5,
    },
    {
      filmId: 2,
      nameRu: 'Movie 2',
      posterUrlPreview: 'url2',
      ratingKinopoisk: 8.0,
      year: '2021',
      countries: [{ id: '2', country: 'UK' }],
      genres: [{ id: '2', genre: 'Drama' }],
      rating: 8.0,
    },
  ];

  it('renders a list of movies', () => {
    render(<MovieList movies={movies} onMovieSelect={() => {}} />);

    expect(screen.getByText('Movie 1')).toBeInTheDocument();
    expect(screen.getByText('Movie 2')).toBeInTheDocument();
  });

  it('calls onMovieSelect with a movie on item click', () => {
    const handleMovieSelect = jest.fn();
    render(<MovieList movies={movies} onMovieSelect={handleMovieSelect} />);

    fireEvent.click(screen.getByText('Movie 1'));

    expect(handleMovieSelect).toHaveBeenCalledWith(movies[0]);
  });

  it('loads selected movies on mount for the current user', async () => {
    render(<MovieList movies={movies} onMovieSelect={() => {}} />);
    const movieElement = await screen.findByText(movies[0].nameRu);
    expect(movieElement).toBeInTheDocument();

    await waitFor(() => {
      expect(getDoc).toHaveBeenCalledWith('fakeDocumentReference');
    });
  });

  it('toggles movie selection on button click', async () => {
    const userUid = 'testUid';
    const userDocRef = doc(db, 'selectedMovies', userUid);
    (setDoc as jest.Mock).mockResolvedValueOnce(undefined);
    render(<MovieList movies={movies} onMovieSelect={() => {}} />);
    const selectButton = await screen.findByText('+', { selector: 'button' });
    fireEvent.click(selectButton);
    expect(setDoc).toHaveBeenCalledWith(userDocRef, expect.any(Object));
  });
});
