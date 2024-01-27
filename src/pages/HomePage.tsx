import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import MovieList from '../components/MovieList/MovieList';
import Modal from '../components/Modal/Modal';
import { fetchMovies, fetchMovieDetails } from '../components/Api/fetchMovies';
import Pagination from '../components/Pagination/Pagination';
import SearchForms from '../components/Header/SearchForms';
import {
  fetchMoviesByTitle,
  fetchMoviesByFilters,
} from '../components/Api/searchMovies';

const HomePage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);

  const handleSearchResults = (
    newMovies: Movie[],
    newTotalPages: number,
    newSearchParams: SearchParams,
  ) => {
    setMovies(newMovies);
    setCurrentPage(1);
    setTotalPages(newTotalPages);
    setSearchParams(newSearchParams); // сохраняем параметры поиска
  };

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const moviesResponse = await fetchMovies();
        setMovies(moviesResponse.films);
        setTotalPages(moviesResponse.pagesCount);
      } catch (error) {
        console.error('Ошибка при загрузке фильмов:', error);
      }
    };

    loadMovies();
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('stop-scrolling');
    } else {
      document.body.classList.remove('stop-scrolling');
    }

    // Очистка эффекта
    return () => {
      document.body.classList.remove('stop-scrolling');
    };
  }, [isModalOpen]);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        let response;
        if (searchParams) {
          if (searchParams.keyword) {
            // Загрузка фильмов по названию
            response = await fetchMoviesByTitle(
              searchParams.keyword,
              currentPage,
            );
          } else {
            // Создание объекта фильтров из searchParams
            const filters = {
              countries: searchParams.countries,
              genres: searchParams.genres,
              order: searchParams.order,
              type: searchParams.type,
              ratingFrom: searchParams.ratingFrom,
              ratingTo: searchParams.ratingTo,
              yearFrom: searchParams.yearFrom,
              yearTo: searchParams.yearTo,
            };
            // Загрузка фильмов по фильтрам
            response = await fetchMoviesByFilters(filters, currentPage);
          }
        } else {
          // Загрузка популярных фильмов или других по умолчанию
          response = await fetchMovies(currentPage);
        }
        setMovies(response.films);
        setTotalPages(response.pagesCount);
      } catch (error) {
        console.error('Ошибка при загрузке фильмов:', error);
      }
    };

    loadMovies();
  }, [currentPage, searchParams]); // Зависимости useEffect

  const handleMovieSelect = async (movie: Movie) => {
    console.log('Выбран фильм:', movie);
    if (movie.filmId) {
      try {
        const movieDetails = await fetchMovieDetails(movie.filmId);
        console.log('Детали фильма:', movieDetails);
        setSelectedMovie(movieDetails);
        setIsModalOpen(true);
      } catch (error) {
        console.error('Ошибка при загрузке деталей фильма:', error);
      }
    } else {
      console.error('Ошибка: filmId фильма не найден');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
    document.body.classList.remove('stop-scrolling');
  };

  return (
    <div>
      <Header />
      <SearchForms onSearchResults={handleSearchResults} />
      <MovieList movies={movies} onMovieSelect={handleMovieSelect} />
      {isModalOpen && selectedMovie && (
        <Modal
          movie={selectedMovie}
          onClose={handleCloseModal}
          isModalOpen={isModalOpen}
        />
      )}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default HomePage;
