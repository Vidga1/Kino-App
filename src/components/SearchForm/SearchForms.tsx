import React, { useEffect, useState } from 'react';
import { loadFilterOptions } from '../../api/kinopoisk/loadFilter';
import {
  fetchMoviesByTitle,
  fetchMoviesByFilters,
} from '../../api/kinopoisk/searchMovies';
import { useNavigate } from 'react-router-dom';
import { resetFilters } from '../../helpers/resetFilters';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Paper,
  SelectChangeEvent,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
} from '@mui/material';

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
    const filters: Record<string, string> = {
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
      navigate(`/filters?${new URLSearchParams(filters).toString()}`);
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

  const commonFieldStyles = {
    flex: '1 1 auto',
    minWidth: 0,
  };

  return (
    <Box sx={{ mb: 3, width: '100%' }}>
      <Paper
        elevation={3}
        sx={{ p: 3, bgcolor: '#1e293b', borderRadius: 2, color: '#ffffff' }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mb: 3,
          }}
        >
          <ToggleButtonGroup
            value={searchMode}
            exclusive
            onChange={handleModeChange}
            color="primary"
            sx={{
              '& .MuiToggleButton-root': {
                borderColor: '#ffffff33',
                color: '#ffffffcc',
              },
              '& .MuiToggleButton-root.Mui-selected': {
                backgroundColor: '#ffffff22',
                borderColor: '#ffffff88',
                color: '#ffffff',
              },
              '& .MuiToggleButton-root:hover': {
                backgroundColor: '#ffffff11',
              },
            }}
          >
            <ToggleButton value="filters">Поиск по фильтрам</ToggleButton>
            <ToggleButton value="keyword">Поиск по названию</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {searchMode === 'filters' && (
          <Stack spacing={2}>
            <Box
              component="form"
              id="filterSearchForm"
              onSubmit={handleSearchByFilters}
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 2,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FormControl
                size="small"
                sx={{ ...commonFieldStyles, maxWidth: 150 }}
              >
                <InputLabel sx={{ color: '#ffffff' }}>Страна</InputLabel>
                <Select
                  value={selectedCountry}
                  label="Страна"
                  onChange={(e: SelectChangeEvent<string>) =>
                    setSelectedCountry(e.target.value)
                  }
                  sx={{
                    color: '#ffffff',
                    '& .MuiSvgIcon-root': { color: '#ffffff' },
                  }}
                >
                  <MenuItem value="">
                    <em>Выберите страну</em>
                  </MenuItem>
                  {countries.map((country) => (
                    <MenuItem key={country.id} value={country.id}>
                      {country.country}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl
                size="small"
                sx={{ ...commonFieldStyles, maxWidth: 150 }}
              >
                <InputLabel sx={{ color: '#ffffff' }}>Жанр</InputLabel>
                <Select
                  value={selectedGenre}
                  label="Жанр"
                  onChange={(e: SelectChangeEvent<string>) =>
                    setSelectedGenre(e.target.value)
                  }
                  sx={{
                    color: '#ffffff',
                    '& .MuiSvgIcon-root': { color: '#ffffff' },
                  }}
                >
                  <MenuItem value="">
                    <em>Выберите жанр</em>
                  </MenuItem>
                  {genres.map((genre) => (
                    <MenuItem key={genre.id} value={genre.id}>
                      {genre.genre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl
                size="small"
                sx={{ ...commonFieldStyles, maxWidth: 150 }}
              >
                <InputLabel sx={{ color: '#ffffff' }}>Сортировка</InputLabel>
                <Select
                  value={selectedOrder}
                  label="Сортировка"
                  onChange={(e: SelectChangeEvent<string>) =>
                    setSelectedOrder(e.target.value)
                  }
                  sx={{
                    color: '#ffffff',
                    '& .MuiSvgIcon-root': { color: '#ffffff' },
                  }}
                >
                  <MenuItem value="">
                    <em>Сортировка</em>
                  </MenuItem>
                  <MenuItem value="RATING">По рейтингу</MenuItem>
                  <MenuItem value="NUM_VOTE">По оценкам</MenuItem>
                  <MenuItem value="YEAR">По годам</MenuItem>
                </Select>
              </FormControl>

              <FormControl
                size="small"
                sx={{ ...commonFieldStyles, maxWidth: 150 }}
              >
                <InputLabel sx={{ color: '#ffffff' }}>Тип</InputLabel>
                <Select
                  value={selectedType}
                  label="Тип"
                  onChange={(e: SelectChangeEvent<string>) =>
                    setSelectedType(e.target.value)
                  }
                  sx={{
                    color: '#ffffff',
                    '& .MuiSvgIcon-root': { color: '#ffffff' },
                  }}
                >
                  <MenuItem value="">
                    <em>Тип</em>
                  </MenuItem>
                  <MenuItem value="ALL">Все</MenuItem>
                  <MenuItem value="FILM">Фильм</MenuItem>
                  <MenuItem value="TV_SHOW">ТВ шоу</MenuItem>
                  <MenuItem value="TV_SERIES">ТВ сериал</MenuItem>
                  <MenuItem value="MINI_SERIES">Мини-сериал</MenuItem>
                </Select>
              </FormControl>

              <TextField
                type="number"
                label="Рейтинг от"
                value={ratingFrom}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setRatingFrom(e.target.value)
                }
                size="small"
                sx={{
                  ...commonFieldStyles,
                  maxWidth: 100,
                  input: { color: '#ffffff' },
                  '& .MuiInputLabel-root': { color: '#ffffff' },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#ffffff88',
                  },
                }}
              />

              <TextField
                type="number"
                label="Рейтинг до"
                value={ratingTo}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setRatingTo(e.target.value)
                }
                size="small"
                sx={{
                  ...commonFieldStyles,
                  maxWidth: 100,
                  input: { color: '#ffffff' },
                  '& .MuiInputLabel-root': { color: '#ffffff' },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#ffffff88',
                  },
                }}
              />

              <TextField
                type="number"
                label="Год от"
                value={yearFrom}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setYearFrom(e.target.value)
                }
                size="small"
                sx={{
                  ...commonFieldStyles,
                  maxWidth: 100,
                  input: { color: '#ffffff' },
                  '& .MuiInputLabel-root': { color: '#ffffff' },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#ffffff88',
                  },
                }}
              />

              <TextField
                type="number"
                label="Год до"
                value={yearTo}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setYearTo(e.target.value)
                }
                size="small"
                sx={{
                  ...commonFieldStyles,
                  maxWidth: 100,
                  input: { color: '#ffffff' },
                  '& .MuiInputLabel-root': { color: '#ffffff' },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#ffffff88',
                  },
                }}
              />

              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ minWidth: 100, flexShrink: 0 }}
              >
                Поиск
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                type="button"
                onClick={() =>
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
                  })
                }
                sx={{
                  minWidth: 100,
                  flexShrink: 0,
                  borderColor: '#ffffff88',
                  color: '#ffffff',
                }}
              >
                Сброс
              </Button>
            </Box>
          </Stack>
        )}

        {searchMode === 'keyword' && (
          <Box
            component="form"
            onSubmit={handleSearchByName}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              gap: 2,
              mt: 2,
              color: '#ffffff',
            }}
          >
            <TextField
              variant="outlined"
              label="Введите название"
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchTerm(e.target.value)
              }
              size="small"
              sx={{
                minWidth: 200,
                input: { color: '#ffffff' },
                '& .MuiInputLabel-root': { color: '#ffffff' },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#ffffff88',
                },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ minWidth: 80 }}
            >
              Поиск
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default SearchForms;
