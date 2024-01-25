import React from 'react';

const SearchFilterForm: React.FC = () => {
  return (
    <div className="search-container">
      <form id="filterSearchForm">
        <select id="countrySelect" className="filter">
          <option value="" className="empty-filter" disabled selected hidden>
            Страна
          </option>
        </select>

        <select id="genreSelect" className="filter">
          <option value="" className="empty-filter" disabled selected hidden>
            Жанр
          </option>
        </select>

        <select id="orderSelect" className="filter">
          <option value="" className="empty-filter" disabled selected hidden>
            Сортировка
          </option>
          <option value="RATING">По рейтингу</option>
          <option value="NUM_VOTE">По оценкам</option>
          <option value="YEAR">По годам</option>
        </select>

        <select id="typeSelect" className="filter">
          <option value="" className="empty-filter" disabled selected hidden>
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
          className="filter"
          placeholder="Рейтинг от"
        />
        <input
          type="number"
          id="ratingTo"
          className="filter"
          placeholder="Рейтинг до"
        />

        <input
          type="number"
          id="yearFrom"
          className="filter"
          placeholder="Год от"
        />
        <input
          type="number"
          id="yearTo"
          className="filter"
          placeholder="Год до"
        />

        <button type="submit">Поиск</button>
      </form>
    </div>
  );
};

export default SearchFilterForm;
