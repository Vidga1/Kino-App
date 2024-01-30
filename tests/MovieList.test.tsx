import React from 'react';
import { getClassByRate } from '../src/components/MovieList/MovieList'; 
import MovieList from '../src/components/MovieList/MovieList'
import { render } from '@testing-library/react';

describe('getClassByRate', () => {
    test('returns blue for string ratings ending with %', () => {
      expect(getClassByRate('80%')).toBe('blue');
    });
  
    test('returns green for ratings equal to or greater than 7', () => {
      expect(getClassByRate(7)).toBe('green');
      expect(getClassByRate('8')).toBe('green');
    });
  
    test('returns orange for ratings greater than 3 and less than 7', () => {
      expect(getClassByRate(4)).toBe('orange');
      expect(getClassByRate('6')).toBe('orange');
    });
  
    test('returns red for ratings 3 or less', () => {
      expect(getClassByRate(3)).toBe('red');
      expect(getClassByRate('2')).toBe('red');
    });
  
    test('returns default for non-numeric ratings', () => {
      expect(getClassByRate('N/A')).toBe('default');
    });
  });

  const mockMovies: Movie[] = [
    {
      filmId: 1,
      kinopoiskId: 101,
      nameRu: 'Тестовый фильм',
      posterUrlPreview: 'test-url.jpg',
      year: '2021',
      countries: [{ id: 'ru', country: 'Россия' }], 
      genres: [{ id: '1', genre: 'Комедия' }], 
      rating: 7.5,
      ratingKinopoisk: 8.0,
    },
  ];
  
  describe('MovieList Component', () => {
    beforeEach(() => {
      localStorage.clear();
      jest.spyOn(global.localStorage, 'setItem');
    });
  
    test('отображает список фильмов', () => {
      const { getByText, getAllByText } = render(
        <MovieList movies={mockMovies} onMovieSelect={() => {}} />
      );
  
      expect(getByText('Тестовый фильм')).toBeInTheDocument();
      expect(getAllByText('Россия - 2021').length).toBeGreaterThan(0);
      expect(getByText('Комедия')).toBeInTheDocument();
    });
  });