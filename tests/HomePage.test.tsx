import React from 'react';
import { render, waitFor } from '@testing-library/react';
import HomePage from '../src/pages/HomePage';
import * as getMoviesApi from '../src/Api/getMovies';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../src/hooks/UseAuth';

jest.mock('../src/Api/getMovies', () => ({
  fetchMovies: jest.fn(),
  fetchMovieDetails: jest.fn(),
  fetchMoviesByTitle: jest.fn(),
  fetchMoviesByFilters: jest.fn(),
}));

const mockMoviesResponse = {
  films: [
    {
      filmId: 1,
      nameRu: 'Тестовый фильм',
      year: '2021',
      countries: [{ country: 'Тестовая страна' }],
      genres: [{ genre: 'Тестовый жанр' }],
      rating: 8.2,
    },
  ],
  pagesCount: 1,
};

describe('HomePage', () => {
  beforeEach(() => {
    (getMoviesApi.fetchMovies as jest.Mock).mockResolvedValue(
      mockMoviesResponse,
    );
  });

  it('отображает список фильмов после загрузки', async () => {
    const { findByText } = render(
      <React.StrictMode>
        <BrowserRouter>
          <AuthProvider>
            <HomePage />
          </AuthProvider>
        </BrowserRouter>
      </React.StrictMode>,
    );

    const movieTitle = await findByText('Тестовый фильм');
    expect(movieTitle).toBeInTheDocument();
  });
});
