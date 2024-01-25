import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import MovieList from '../components/MovieList/MovieList';
import Modal from '../components/Modal/Modal';
import { fetchMovies, fetchMovieDetails } from '../components/Api/fetchMovies';
import Pagination from '../components/Pagination/Pagination';

const HomePage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

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
        const moviesResponse = await fetchMovies(currentPage);
        setMovies(moviesResponse.films); // Здесь прямой доступ к массиву фильмов
        setTotalPages(moviesResponse.pagesCount); // Установка общего кол-ва страниц
      } catch (error) {
        console.error('Ошибка при загрузке фильмов:', error);
      }
    };

    loadMovies();
  }, [currentPage]);

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
