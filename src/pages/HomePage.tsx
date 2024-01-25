import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import fetchMovies from '../components/Api/fetchMovies';
import MovieList from '../components/MovieList/MovieList';

const HomePage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const moviesData = await fetchMovies();
        setMovies(moviesData.slice(0, 20));
      } catch (error) {
        console.error('Ошибка при загрузке фильмов:', error);
      }
    };

    loadMovies();
  }, []);

  return (
    <div>
      <Header />
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
