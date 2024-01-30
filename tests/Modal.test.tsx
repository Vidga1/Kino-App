import React from 'react';
import { render } from '@testing-library/react';
import Modal from '../src/components/Modal/Modal';

const mockMovie: MovieDetails = {
  filmId: 1,
  nameRu: 'Тестовый фильм',
  posterUrl: 'test-poster.jpg',
  year: '2021',
  genres: [{ id: '1', genre: 'Комедия' }],
  filmLength: 120,
  description: 'Описание фильма',
  webUrl: 'https://example.com',
  countries: [{ id: 'ru', country: 'Россия' }],
  rating: 8.5,
};

test('отображает информацию фильма', () => {
  const { getByAltText, getByText } = render(
    <Modal movie={mockMovie} onClose={() => {}} isModalOpen={true} />,
  );

  expect(getByAltText('Тестовый фильм')).toHaveAttribute(
    'src',
    'test-poster.jpg',
  );
  expect(
    getByText((_, element) => element!.textContent === 'Тестовый фильм - 2021'),
  ).toBeInTheDocument();
  expect(getByText('Жанр - Комедия')).toBeInTheDocument();
  expect(getByText('Время - 120 минут')).toBeInTheDocument();
  expect(getByText('Описание - Описание фильма')).toBeInTheDocument();
  expect(getByText('https://example.com')).toHaveAttribute(
    'href',
    'https://example.com',
  );
});
