import React, { useEffect, useState } from 'react';
import { loadFilterOptions } from '../../api/kinopoisk/loadFilter';
import {
  fetchMoviesByTitle,
  fetchMoviesByFilters,
} from '../../api/kinopoisk/searchMovies';
import { useNavigate } from 'react-router-dom';
import { Box, Paper } from '@mui/material';
import SearchModeToggle from './SearchModeToggle';
import FilterSearchForm from './FilterSearchForm';
import KeywordSearchForm from './KeywordSearchForm';
import { resetFilters } from '../../helpers/resetFilters';

const SearchForms: React.FC<SearchFilterFormProps> = ({ onSearchResults }) => {
  const navigate = useNavigate();
  const [countries, setCountries] = useState<Country[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [selectedOrder, setSelectedOrder] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [ratingFrom, setRatingFrom] = useState<string>('');
  const [ratingTo, setRatingTo] = useState<string>('');
  const [yearFrom, setYearFrom] = useState<string>('');
  const [yearTo, setYearTo] = useState<string>('');

  const [searchMode, setSearchMode] = useState<'filters' | 'keyword'>(
    'filters',
  );

  useEffect(() => {
    const loadFilters = async () => {
      try {
        const data: FilterOptions = await loadFilterOptions();
        if (data) {
          const sortedCountries = data.countries
            .filter((country: Country) => country.country.trim() !== '')
            .sort((a: Country, b: Country) =>
              a.country.localeCompare(b.country, 'ru'),
            );

          const sortedGenres = data.genres
            .filter((genre: Genre) => genre.genre.trim() !== '')
            .sort((a: Genre, b: Genre) => a.genre.localeCompare(b.genre, 'ru'));

          setCountries(sortedCountries);
          setGenres(sortedGenres);
        }
      } catch (error) {
        console.error('Ошибка при загрузке фильтров:', error);
      }
    };

    loadFilters();
  }, []);

  const handleSearchByName = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    try {
      const { films, pagesCount } = await fetchMoviesByTitle(searchTerm);
      onSearchResults(films, pagesCount, { keyword: searchTerm });
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
      setSearchTerm('');
    } catch (error) {
      console.error('Ошибка при поиске:', error);
    }
  };

  const handleSearchByFilters = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    const filters: Filters = {
      countries: selectedCountry,
      genres: selectedGenre,
      order: selectedOrder,
      type: selectedType,
      ratingFrom: ratingFrom,
      ratingTo: ratingTo,
      yearFrom: yearFrom,
      yearTo: yearTo,
    };

    try {
      const { films, pagesCount } = await fetchMoviesByFilters(filters);
      onSearchResults(films, pagesCount, filters);
      const queryParams = new URLSearchParams(
        filters as Record<string, string>,
      ).toString();
      navigate(`/filters?${queryParams}`);
    } catch (error) {
      console.error('Ошибка при поиске:', error);
    }
  };

  const handleModeChange = (
    event: React.MouseEvent<HTMLElement>,
    newMode: 'filters' | 'keyword' | null,
  ) => {
    if (newMode) {
      setSearchMode(newMode);
    }
  };

  const handleFilterChange = (field: keyof Filters, value: string) => {
    switch (field) {
      case 'countries':
        setSelectedCountry(value);
        break;
      case 'genres':
        setSelectedGenre(value);
        break;
      case 'order':
        setSelectedOrder(value);
        break;
      case 'type':
        setSelectedType(value);
        break;
      case 'ratingFrom':
        setRatingFrom(value);
        break;
      case 'ratingTo':
        setRatingTo(value);
        break;
      case 'yearFrom':
        setYearFrom(value);
        break;
      case 'yearTo':
        setYearTo(value);
        break;
      default:
        break;
    }
  };

  const handleResetFilters = () => {
    resetFilters({
      setSearchTerm,
      setSelectedCountry,
      setSelectedGenre,
      setSelectedOrder,
      setSelectedType,
      setRatingFrom,
      setRatingTo,
      setYearFrom,
      setYearTo,
    });
  };

  return (
    <Box sx={{ mb: 3, width: '100%' }}>
      <Paper
        elevation={3}
        sx={{ p: 3, bgcolor: '#1e293b', borderRadius: 2, color: '#ffffff' }}
      >
        <SearchModeToggle
          searchMode={searchMode}
          onModeChange={handleModeChange}
        />

        {searchMode === 'filters' && (
          <FilterSearchForm
            countries={countries}
            genres={genres}
            selectedCountry={selectedCountry}
            selectedGenre={selectedGenre}
            selectedOrder={selectedOrder}
            selectedType={selectedType}
            ratingFrom={ratingFrom}
            ratingTo={ratingTo}
            yearFrom={yearFrom}
            yearTo={yearTo}
            onChange={handleFilterChange}
            onSubmit={handleSearchByFilters}
            onReset={handleResetFilters}
          />
        )}

        {searchMode === 'keyword' && (
          <KeywordSearchForm
            searchTerm={searchTerm}
            onSearchTermChange={setSearchTerm}
            onSubmit={handleSearchByName}
          />
        )}
      </Paper>
    </Box>
  );
};

export default SearchForms;
