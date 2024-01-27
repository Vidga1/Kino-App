import React, { useEffect, useState } from 'react';
import { loadFilterOptions } from '../Api/loadFilter';
import { fetchMoviesByTitle, fetchMoviesByFilters } from '../Api/searchMovies';

const SearchForms: React.FC<SearchFilterFormProps> = ({ onSearchResults }) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
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

  const handleSearchByName = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    try {
      const { films, pagesCount } = await fetchMoviesByTitle(searchTerm);
      onSearchResults(films, pagesCount, { keyword: searchTerm });
      setSearchTerm(''); // Сброс значения searchTerm, чтобы очистить поле ввода
    } catch (error) {
      console.error('Ошибка при поиске:', error);
    }
  };

  const handleSearchByFilters = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    const filters = {
      countries: (document.getElementById('countrySelect') as HTMLSelectElement)
        .value,
      genres: (document.getElementById('genreSelect') as HTMLSelectElement)
        .value,
      order: (document.getElementById('orderSelect') as HTMLSelectElement)
        .value,
      type: (document.getElementById('typeSelect') as HTMLSelectElement).value,
      ratingFrom: (document.getElementById('ratingFrom') as HTMLInputElement)
        .value,
      ratingTo: (document.getElementById('ratingTo') as HTMLInputElement).value,
      yearFrom: (document.getElementById('yearFrom') as HTMLInputElement).value,
      yearTo: (document.getElementById('yearTo') as HTMLInputElement).value,
    };

    try {
      const { films, pagesCount } = await fetchMoviesByFilters(filters);
      onSearchResults(films, pagesCount, filters);
    } catch (error) {
      console.error('Ошибка при поиске:', error);
    }
  };

  const resetFilters = () => {
    const countrySelect = document.getElementById(
      'countrySelect',
    ) as HTMLSelectElement | null;
    const genreSelect = document.getElementById(
      'genreSelect',
    ) as HTMLSelectElement | null;
    const orderSelect = document.getElementById(
      'orderSelect',
    ) as HTMLSelectElement | null;
    const typeSelect = document.getElementById(
      'typeSelect',
    ) as HTMLSelectElement | null;
    const ratingFrom = document.getElementById(
      'ratingFrom',
    ) as HTMLInputElement | null;
    const ratingTo = document.getElementById(
      'ratingTo',
    ) as HTMLInputElement | null;
    const yearFrom = document.getElementById(
      'yearFrom',
    ) as HTMLInputElement | null;
    const yearTo = document.getElementById('yearTo') as HTMLInputElement | null;

    if (countrySelect) countrySelect.value = '';
    if (genreSelect) genreSelect.value = '';
    if (orderSelect) orderSelect.value = '';
    if (typeSelect) typeSelect.value = '';
    if (ratingFrom) ratingFrom.value = '';
    if (ratingTo) ratingTo.value = '';
    if (yearFrom) yearFrom.value = '';
    if (yearTo) yearTo.value = '';

    setSearchTerm('');
  };

  return (
    <div className="search-container">
      <form id="filterSearchForm" onSubmit={handleSearchByFilters}>
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
        <button type="submit">Поиск по фильтрам</button>
        <button type="button" onClick={resetFilters}>
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
