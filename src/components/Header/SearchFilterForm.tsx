import React, { useEffect, useState } from 'react';
import { loadFilterOptions } from '../Api/loadFilter';
import { fetchMoviesByTitle } from '../Api/searchMovies';

const SearchFilterForm: React.FC<SearchFilterFormProps> = ({
  onSearchResults,
}) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { films, pagesCount } = await fetchMoviesByTitle(searchTerm);
      const searchParams: SearchParams = {
        keyword: searchTerm,
      };

      onSearchResults(films, pagesCount, searchParams);
    } catch (error) {
      console.error('Ошибка при поиске:', error);
    }
  };

  return (
    <div className="search-container">
      <form id="filterSearchForm" onSubmit={handleSearch}>
        <select id="countrySelect" name="countrySelect" className="filter">
          <option value="" disabled selected hidden>
            Выберите страну
          </option>
          {countries.map((country) => (
            <option key={country.id} value={country.id}>
              {country.country}
            </option>
          ))}
        </select>

        <select id="genreSelect" name="genreSelect" className="filter">
          <option value="" disabled selected hidden>
            Выберите жанр
          </option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.genre}
            </option>
          ))}
        </select>

        <select id="orderSelect" name="orderSelect" className="filter">
          <option value="" disabled hidden>
            Сортировка
          </option>
          <option value="RATING">По рейтингу</option>
          <option value="NUM_VOTE">По оценкам</option>
          <option value="YEAR">По годам</option>
        </select>

        <select id="typeSelect" name="typeSelect" className="filter">
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
        />
        <input
          type="number"
          id="ratingTo"
          name="ratingTo"
          className="filter smaller-input"
          placeholder="Рейтинг до"
        />

        <input
          type="number"
          id="yearFrom"
          name="yearFrom"
          className="filter smaller-input"
          placeholder="Год от"
        />
        <input
          type="number"
          id="yearTo"
          name="yearTo"
          className="filter smaller-input"
          placeholder="Год до"
        />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Введите название"
        />
        <button type="submit">Поиск</button>
      </form>
    </div>
  );
};
export default SearchFilterForm;
