import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import SelectedMoviesList from '../src/components/MovieList/SelectedMoviesList';
import { getDoc, updateDoc } from 'firebase/firestore';

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(() => ({})),
  getDoc: jest.fn(),
  updateDoc: jest.fn(),
  doc: jest.fn(() => ({})),
}));

jest.mock('../src/hooks/UseAuth', () => ({
  useAuth: () => ({
    currentUser: { uid: 'testUserId' },
  }),
}));

const mockMovies: MovieSelect[] = [
  {
    kinopoiskId: 1,
    filmId: 1,
    nameRu: 'Selected Movie 1',
    posterUrlPreview: 'url1',
    year: '2020',
    countries: [{ country: 'USA' }],
    genres: [{ genre: 'Comedy' }],
    ratingKinopoisk: 7.5,
    rating: '7.5',
    normalizedRating: '8.0',
    ratingImdb: 8.0,
  },
  {
    kinopoiskId: 2,
    filmId: 2,
    nameRu: 'Selected Movie 2',
    posterUrlPreview: 'url2',
    year: '2021',
    countries: [{ country: 'UK' }],
    genres: [{ genre: 'Drama' }],
    ratingKinopoisk: 8.0,
    rating: '8.0',
    normalizedRating: '8.0',
    ratingImdb: 8.0,
  },
];

const mockGetDocResponse = {
  exists: () => true,
  data: () => ({
    movies: mockMovies.reduce(
      (acc: Record<string, MovieSelect>, movie: MovieSelect) => {
        if (movie.filmId !== undefined) {
          acc[movie.filmId.toString()] = movie;
        }
        return acc;
      },
      {},
    ),
  }),
};

describe('SelectedMoviesList', () => {
  beforeEach(() => {
    (getDoc as jest.Mock).mockResolvedValue(mockGetDocResponse);
    jest.clearAllMocks();
  });

  it('renders a list of selected movies', async () => {
    render(<SelectedMoviesList currentPage={1} moviesPerPage={2} />);

    await waitFor(() => {
      expect(screen.getByText('Selected Movie 1')).toBeInTheDocument();
      expect(screen.getByText('Selected Movie 2')).toBeInTheDocument();
    });
  });

  it('handles movie removal correctly', async () => {
    render(<SelectedMoviesList currentPage={1} moviesPerPage={2} />);
    await waitFor(() =>
      expect(screen.getByText('Selected Movie 1')).toBeInTheDocument(),
    );

    const removeButton = screen.getAllByText('✕')[0];
    fireEvent.click(removeButton);

    await waitFor(() => {
      expect(updateDoc).toHaveBeenCalled();
    });
  });
});
