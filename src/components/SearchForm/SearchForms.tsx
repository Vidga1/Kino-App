import React, { useEffect, useState } from 'react';
import { loadFilterOptions } from '../../Api/loadFilter';
import {
  fetchMoviesByTitle,
  fetchMoviesByFilters,
} from '../../Api/searchMovies';
import { useNavigate } from 'react-router-dom';
import { resetFilters } from '../../helpers/resetFilters';

const SearchForms: React.FC<SearchFilterFormProps> = ({ onSearchResults }) => {
  const navigate = useNavigate();
  const [countries, setCountries] = useState<Country[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedOrder, setSelectedOrder] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [ratingFrom, setRatingFrom] = useState('');
  const [ratingTo, setRatingTo] = useState('');
  const [yearFrom, setYearFrom] = useState('');
  const [yearTo, setYearTo] = useState('');

  useEffect(() => {
    const loadFilters = async () => {
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
      setSearchTerm('');
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    } catch (error) {
      console.error('Ошибка при поиске:', error);
    }
  };

  const handleSearchByFilters = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    const filters = {
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

  return (
    <div className="search-container">
      <form
        id="filterSearchForm"
        data-testid="filterSearchForm"
        onSubmit={handleSearchByFilters}
      >
        <select
          id="countrySelect"
          name="countrySelect"
          className="filter"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          <option value="" disabled hidden>
            Выберите страну
          </option>
          {countries.map((country) => (
            <option key={country.id} value={country.id}>
              {country.country}
            </option>
          ))}
        </select>

        <select
          id="genreSelect"
          name="genreSelect"
          className="filter"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="" disabled hidden>
            Выберите жанр
          </option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.genre}
            </option>
          ))}
        </select>

        <select
          id="orderSelect"
          name="orderSelect"
          className="filter"
          value={selectedOrder}
          onChange={(e) => setSelectedOrder(e.target.value)}
        >
          <option value="" disabled hidden>
            Сортировка
          </option>
          <option value="RATING">По рейтингу</option>
          <option value="NUM_VOTE">По оценкам</option>
          <option value="YEAR">По годам</option>
        </select>

        <select
          id="typeSelect"
          name="typeSelect"
          className="filter"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="" disabled hidden>
            Тип
          </option>
          <option value="ALL">Все</option>
          <option value="FILM">Фильм</option>
          <option value="TV_SHOW">ТВ шоу</option>
          <option value="TV_SERIES">ТВ сериал</option>
          <option value="MINI_SERIES">Мини-сериал</option>
        </select>

        <input
          type="number"
          id="ratingFrom"
          name="ratingFrom"
          className="filter smaller-input"
          placeholder="Рейтинг от"
          value={ratingFrom}
          onChange={(e) => setRatingFrom(e.target.value)}
        />
        <input
          type="number"
          id="ratingTo"
          name="ratingTo"
          className="filter smaller-input"
          placeholder="Рейтинг до"
          value={ratingTo}
          onChange={(e) => setRatingTo(e.target.value)}
        />
        <input
          type="number"
          id="yearFrom"
          name="yearFrom"
          className="filter smaller-input"
          placeholder="Год от"
          value={yearFrom}
          onChange={(e) => setYearFrom(e.target.value)}
        />
        <input
          type="number"
          id="yearTo"
          name="yearTo"
          className="filter smaller-input"
          placeholder="Год до"
          value={yearTo}
          onChange={(e) => setYearTo(e.target.value)}
        />
        <button type="submit">Поиск по фильтрам</button>
        <button
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
        >
          Сбросить фильтры
        </button>
      </form>
      <form onSubmit={handleSearchByName} style={{ marginTop: '10px' }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Введите название"
        />
        <button type="submit">Поиск по названию</button>
      </form>
    </div>
  );
};
export default SearchForms;
