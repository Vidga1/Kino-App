import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SelectedMoviesList from '../src/components/MovieList/SelectedMoviesList';

interface StoredMovie {
  kinopoiskId: number;
  nameRu: string;
  posterUrlPreview: string;
  year: string;
  genres: { genre: string }[];
  ratingKinopoisk: number;
}

const mockLocalStorage = (movies: { [key: string]: StoredMovie }) => {
  const fakeLocalStorage = {
    getItem: jest.fn().mockImplementation((key) => {
      return key === 'selectedMovies' ? JSON.stringify(movies) : null;
    }),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  };
  Object.defineProperty(window, 'localStorage', { value: fakeLocalStorage });
};

describe('SelectedMoviesList Component', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test('отображает фильмы из localStorage', () => {
    const storedMovies = {
      '1': {
        kinopoiskId: 1,
        nameRu: 'Тестовый фильм',
        posterUrlPreview: 'test-url.jpg',
        year: '2021',
        genres: [{ genre: 'Комедия' }],
        ratingKinopoisk: 8.0,
      },
    };
    mockLocalStorage(storedMovies);

    const { getByText } = render(
      <SelectedMoviesList currentPage={1} moviesPerPage={10} />,
    );

    expect(getByText('Тестовый фильм')).toBeInTheDocument();
  });

  test('удаляет фильм из списка и обновляет localStorage', () => {
    const storedMovies = {
      '1': {
        kinopoiskId: 1,
        nameRu: 'Тестовый фильм',
        posterUrlPreview: 'test-url.jpg',
        year: '2021',
        genres: [{ genre: 'Комедия' }],
        ratingKinopoisk: 8.0,
      },
    };
    mockLocalStorage(storedMovies);

    const { getByText, queryByText } = render(
      <SelectedMoviesList currentPage={1} moviesPerPage={10} />,
    );

    fireEvent.click(getByText('✕'));
    expect(queryByText('Тестовый фильм')).toBeNull();
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'selectedMovies',
      expect.any(String),
    );
  });
});
