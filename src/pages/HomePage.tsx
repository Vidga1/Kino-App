import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header/Header';
import MovieList from '../components/MovieList/MovieList';
import Modal from '../components/Modal/Modal';
import { fetchMovies, fetchMovieDetails } from '../Api/getMovies';
import Pagination from '../components/Pagination/Pagination';
import SearchForms from '../components/Header/SearchForms';
import { fetchMoviesByTitle, fetchMoviesByFilters } from '../Api/searchMovies';

const HomePage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);
  const location = useLocation();

  const handleSearchResults = useCallback(
    (
      newMovies: Movie[],
      newTotalPages: number,
      newSearchParams: SearchParams,
    ) => {
      setMovies(newMovies);
      setCurrentPage(1);
      setTotalPages(newTotalPages);
      setSearchParams(newSearchParams);
    },
    [],
  );

  useEffect(() => {
    const loadInitialMovies = async () => {
      try {
        const moviesResponse = await fetchMovies();
        setMovies(moviesResponse.films);
        setTotalPages(moviesResponse.pagesCount);
      } catch (error) {
        console.error('Ошибка при загрузке фильмов:', error);
      }
    };

    loadInitialMovies();
  }, []);

  useEffect(() => {
    document.body.classList.toggle('stop-scrolling', isModalOpen);
    return () => {
      document.body.classList.remove('stop-scrolling');
    };
  }, [isModalOpen]);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        let response;

        if (location.pathname.includes('/filters')) {
          const filters = Object.fromEntries(searchParams.entries());
          response = await fetchMoviesByFilters(filters, currentPage);
        } else if (
          location.pathname.includes('/search') &&
          searchParams.has('query')
        ) {
          const query = searchParams.get('query') || '';
          response = await fetchMoviesByTitle(query, currentPage);
        } else {
          response = await fetchMovies(currentPage);
        }

        setMovies(response.films);
        setTotalPages(response.pagesCount);
      } catch (error) {
        console.error('Ошибка при загрузке фильмов:', error);
      }
    };

    loadMovies();
  }, [currentPage, location]);

  const handleMovieSelect = useCallback(async (movie: Movie) => {
    const movieId = movie.kinopoiskId || movie.filmId;
    if (movieId) {
      try {
        const movieDetails = await fetchMovieDetails(movieId);
        setSelectedMovie(movieDetails);
        setIsModalOpen(true);
      } catch (error) {
        console.error('Ошибка при загрузке деталей фильма:', error);
      }
    } else {
      console.error('Ошибка: Идентификатор фильма не найден');
    }
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  }, []);

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
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default HomePage;
