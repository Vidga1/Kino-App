import React from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  SelectChangeEvent,
  Stack,
} from '@mui/material';

interface FilterSearchFormProps {
  countries: Country[];
  genres: Genre[];
  selectedCountry: string;
  selectedGenre: string;
  selectedOrder: string;
  selectedType: string;
  ratingFrom: string;
  ratingTo: string;
  yearFrom: string;
  yearTo: string;
  onChange: (field: keyof Filters, value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onReset: () => void;
}

const FilterSearchForm: React.FC<FilterSearchFormProps> = ({
  countries,
  genres,
  selectedCountry,
  selectedGenre,
  selectedOrder,
  selectedType,
  ratingFrom,
  ratingTo,
  yearFrom,
  yearTo,
  onChange,
  onSubmit,
  onReset,
}) => {
  const commonFieldStyles = {
    flex: '1 1 auto',
    minWidth: 0,
  };

  return (
    <Stack spacing={2}>
      <Box
        component="form"
        id="filterSearchForm"
        onSubmit={onSubmit}
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <FormControl size="small" sx={{ ...commonFieldStyles, maxWidth: 150 }}>
          <InputLabel sx={{ color: '#ffffff' }}>Страна</InputLabel>
          <Select
            value={selectedCountry}
            label="Страна"
            onChange={(e: SelectChangeEvent<string>) =>
              onChange('countries', e.target.value)
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

        <FormControl size="small" sx={{ ...commonFieldStyles, maxWidth: 150 }}>
          <InputLabel sx={{ color: '#ffffff' }}>Жанр</InputLabel>
          <Select
            value={selectedGenre}
            label="Жанр"
            onChange={(e: SelectChangeEvent<string>) =>
              onChange('genres', e.target.value)
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

        <FormControl size="small" sx={{ ...commonFieldStyles, maxWidth: 150 }}>
          <InputLabel sx={{ color: '#ffffff' }}>Сортировка</InputLabel>
          <Select
            value={selectedOrder}
            label="Сортировка"
            onChange={(e: SelectChangeEvent<string>) =>
              onChange('order', e.target.value)
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

        <FormControl size="small" sx={{ ...commonFieldStyles, maxWidth: 150 }}>
          <InputLabel sx={{ color: '#ffffff' }}>Тип</InputLabel>
          <Select
            value={selectedType}
            label="Тип"
            onChange={(e: SelectChangeEvent<string>) =>
              onChange('type', e.target.value)
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
            onChange('ratingFrom', e.target.value)
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
            onChange('ratingTo', e.target.value)
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
            onChange('yearFrom', e.target.value)
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
            onChange('yearTo', e.target.value)
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
          onClick={onReset}
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
  );
};

export default FilterSearchForm;
