import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SearchForms from '../src/components/Header/SearchForms';
import * as filterApi from '../src/Api/loadFilter';
import * as searchApi from '../src/Api/searchMovies';
import { resetFilters } from '../src/helpers/resetFilters';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

jest.mock('../src/Api/loadFilter', () => ({
  loadFilterOptions: jest.fn(),
}));

jest.mock('../src/Api/searchMovies', () => ({
  fetchMoviesByTitle: jest.fn(),
  fetchMoviesByFilters: jest.fn(),
}));

describe('SearchForms', () => {
  beforeEach(() => {
    (
      filterApi.loadFilterOptions as jest.MockedFunction<
        typeof filterApi.loadFilterOptions
      >
    ).mockResolvedValue({
      countries: [{ id: '1', country: 'USA' }],
      genres: [{ id: '1', genre: 'Comedy' }],
    });

    (
      searchApi.fetchMoviesByTitle as jest.MockedFunction<
        typeof searchApi.fetchMoviesByTitle
      >
    ).mockResolvedValue({
      films: [{ id: 1, name: 'Test Movie' }],
      pagesCount: 1,
    });

    (
      searchApi.fetchMoviesByFilters as jest.MockedFunction<
        typeof searchApi.fetchMoviesByFilters
      >
    ).mockResolvedValue({
      films: [{ id: 2, name: 'Filtered Movie' }],
      pagesCount: 1,
    });
  });

  it('renders correctly', async () => {
    render(<SearchForms onSearchResults={jest.fn()} />, {
      wrapper: MemoryRouter,
    });

    await waitFor(() => {
      expect(
        screen.getByPlaceholderText('Введите название'),
      ).toBeInTheDocument();
      expect(screen.getByText('Выберите страну')).toBeInTheDocument();
      expect(screen.getByText('Выберите жанр')).toBeInTheDocument();
    });
  });

  it('submits search by name', async () => {
    render(<SearchForms onSearchResults={jest.fn()} />, {
      wrapper: MemoryRouter,
    });

    const input = screen.getByPlaceholderText('Введите название');
    fireEvent.change(input, { target: { value: 'Test' } });

    await act(async () => {
      fireEvent.submit(input);
    });

    expect(searchApi.fetchMoviesByTitle).toHaveBeenCalledWith('Test');
  });

  it('submits search by filters', async () => {
    render(<SearchForms onSearchResults={jest.fn()} />, {
      wrapper: MemoryRouter,
    });

    fireEvent.change(screen.getByPlaceholderText('Рейтинг от'), {
      target: { value: '5' },
    });

    await act(async () => {
      fireEvent.submit(screen.getByTestId('filterSearchForm'));
    });

    expect(searchApi.fetchMoviesByFilters).toHaveBeenCalledWith(
      expect.any(Object),
    );
  });

  it('loads filter options on mount', async () => {
    render(<SearchForms onSearchResults={jest.fn()} />, {
      wrapper: MemoryRouter,
    });

    await waitFor(() => {
      expect(filterApi.loadFilterOptions).toHaveBeenCalled();
      expect(screen.getByText('USA')).toBeInTheDocument();
      expect(screen.getByText('Comedy')).toBeInTheDocument();
    });
  });
});

describe('resetFilters', () => {
  it('должен вызывать функции установки состояния с пустыми строками', () => {
    const mockSetSearchTerm = jest.fn();
    const mockSetSelectedCountry = jest.fn();
    const mockSetSelectedGenre = jest.fn();
    const mockSetSelectedOrder = jest.fn();
    const mockSetSelectedType = jest.fn();
    const mockSetRatingFrom = jest.fn();
    const mockSetRatingTo = jest.fn();
    const mockSetYearFrom = jest.fn();
    const mockSetYearTo = jest.fn();

    resetFilters({
      setSearchTerm: mockSetSearchTerm,
      setSelectedCountry: mockSetSelectedCountry,
      setSelectedGenre: mockSetSelectedGenre,
      setSelectedOrder: mockSetSelectedOrder,
      setSelectedType: mockSetSelectedType,
      setRatingFrom: mockSetRatingFrom,
      setRatingTo: mockSetRatingTo,
      setYearFrom: mockSetYearFrom,
      setYearTo: mockSetYearTo,
    });

    expect(mockSetSearchTerm).toHaveBeenCalledWith('');
    expect(mockSetSelectedCountry).toHaveBeenCalledWith('');
    expect(mockSetSelectedGenre).toHaveBeenCalledWith('');
    expect(mockSetSelectedOrder).toHaveBeenCalledWith('');
    expect(mockSetSelectedType).toHaveBeenCalledWith('');
    expect(mockSetRatingFrom).toHaveBeenCalledWith('');
    expect(mockSetRatingTo).toHaveBeenCalledWith('');
    expect(mockSetYearFrom).toHaveBeenCalledWith('');
    expect(mockSetYearTo).toHaveBeenCalledWith('');
  });

  it('должен корректно обрабатывать отсутствующие функции установки состояния', () => {
    const mockSetSearchTerm = jest.fn();
    const mockSetSelectedCountry = jest.fn();

    resetFilters({
      setSearchTerm: mockSetSearchTerm,
      setSelectedCountry: mockSetSelectedCountry,
    });

    expect(mockSetSearchTerm).toHaveBeenCalledWith('');
    expect(mockSetSelectedCountry).toHaveBeenCalledWith('');

    expect(mockSetSearchTerm).toHaveBeenCalledTimes(1);
    expect(mockSetSelectedCountry).toHaveBeenCalledTimes(1);
  });
});
