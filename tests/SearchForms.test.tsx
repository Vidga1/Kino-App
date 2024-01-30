import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SearchForms from '../src/components/Header/SearchForms'; 
import { loadFilterOptions } from '../src/components/Api/loadFilter';
import {
    fetchMoviesByTitle,
    fetchMoviesByFilters,
  } from '../src/components/Api/searchMovies';

jest.mock('../src/components/Api/loadFilter', () => ({
  loadFilterOptions: jest.fn(),
}));
jest.mock('../src/components/Api/searchMovies', () => ({
  fetchMoviesByTitle: jest.fn(),
  fetchMoviesByFilters: jest.fn(),
}));

describe('SearchForms Component', () => {
  beforeEach(() => {

    (loadFilterOptions as jest.Mock).mockResolvedValue({
      countries: [{ id: 'ru', country: 'Россия' }],
      genres: [{ id: 'drama', genre: 'Драма' }],
    });
  });

  test('отображает компонент и загружает фильтры', async () => {
    const { findByText } = render(<SearchForms onSearchResults={() => {}} />);

    await findByText('Выберите страну');
    await findByText('Выберите жанр');
  });

  test('обработка поиска по названию', async () => {
    (fetchMoviesByTitle as jest.Mock).mockResolvedValue({
      films: [{ id: 1, title: 'Тестовый фильм' }],
      pagesCount: 1,
    });

    const onSearchResults = jest.fn();
    const { getByPlaceholderText, getByText } = render(<SearchForms onSearchResults={onSearchResults} />);

    fireEvent.change(getByPlaceholderText('Введите название'), { target: { value: 'Тестовый' } });
    fireEvent.click(getByText('Поиск по названию'));

    await waitFor(() => expect(fetchMoviesByTitle).toHaveBeenCalledWith('Тестовый'));
    expect(onSearchResults).toHaveBeenCalled();
  });

  test('обработка поиска по фильтрам', async () => {
    (fetchMoviesByFilters as jest.Mock).mockResolvedValue({
      films: [{ id: 1, title: 'Фильтрованный фильм' }],
      pagesCount: 1,
    });
  
    const onSearchResults = jest.fn();
    const { getByText } = render(<SearchForms onSearchResults={onSearchResults} />);
  
    fireEvent.submit(getByText('Поиск по фильтрам'));
  
    await waitFor(() => expect(fetchMoviesByFilters).toHaveBeenCalled());
    expect(onSearchResults).toHaveBeenCalled();
  });
  test('сброс фильтров работает корректно', async () => {
    const { getByText, getByPlaceholderText } = render(<SearchForms onSearchResults={() => {}} />);
  
    fireEvent.change(getByPlaceholderText('Рейтинг от'), { target: { value: '8' } });
    fireEvent.click(getByText('Сбросить фильтры'));
  
    await waitFor(() => expect((getByPlaceholderText('Рейтинг от') as HTMLInputElement).value).toBe(''));
  });
  test('рендеринг фильтров после загрузки', async () => {
    (loadFilterOptions as jest.Mock).mockResolvedValue({
      countries: [{ id: 'ru', country: 'Россия' }],
      genres: [{ id: 'comedy', genre: 'Комедия' }],
    });
  
    const { findByText } = render(<SearchForms onSearchResults={() => {}} />);
  
    const countryOption = await findByText('Россия');
    const genreOption = await findByText('Комедия');
  
    expect(countryOption).toBeInTheDocument();
    expect(genreOption).toBeInTheDocument();
  });
});