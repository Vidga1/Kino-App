import React, { useState, useEffect } from 'react';
import { getClassByRate } from './MovieList';

type SelectedMoviesListProps = {
  currentPage: number;
  moviesPerPage: number;
};

const SelectedMoviesList: React.FC<SelectedMoviesListProps> = ({
  currentPage,
  moviesPerPage,
}) => {
  const [selectedMovies, setSelectedMovies] = useState<MovieSelect[]>([]);

  useEffect(() => {
    const rawStoredMovies = localStorage.getItem('selectedMovies') || '{}';
    const storedMovies: { [key: string]: MovieSelect } =
      JSON.parse(rawStoredMovies);

    const allMovies = Object.values(storedMovies)
      .filter((movie) => movie.nameRu && movie.posterUrlPreview)
      .map((movie) => {
        const rawRating: string | number =
          movie.ratingKinopoisk || movie.ratingImdb || movie.rating || 'Н/Д';
        const normalizedRating =
          typeof rawRating === 'number' ? rawRating.toString() : rawRating;

        return {
          ...movie,
          normalizedRating,
        };
      });

    const startIndex = (currentPage - 1) * moviesPerPage;
    const endIndex = startIndex + moviesPerPage;
    const selectedMoviesForPage = allMovies.slice(startIndex, endIndex);

    setSelectedMovies(selectedMoviesForPage);
  }, [currentPage, moviesPerPage]);

  const handleMovieRemove = (movieId: number | undefined) => {
    if (movieId === undefined) return;

    setSelectedMovies((prevMovies) => {
      const newMovies = prevMovies.filter(
        (m) => m.kinopoiskId !== movieId && m.filmId !== movieId,
      );
      const newStoredMovies = {
        ...JSON.parse(localStorage.getItem('selectedMovies') || '{}'),
      };
      delete newStoredMovies[movieId];
      localStorage.setItem('selectedMovies', JSON.stringify(newStoredMovies));
      return newMovies;
    });
  };

  return (
    <div className="movies">
      {selectedMovies.map((movie) => (
        <div key={movie.kinopoiskId || movie.filmId} className="movie">
          <div className="movie__cover-inner">
            <img
              src={movie.posterUrlPreview}
              className="movie__cover"
              alt={movie.nameRu}
            />
            <button
              className="movie__select-button"
              onClick={() =>
                handleMovieRemove(movie.kinopoiskId ?? movie.filmId)
              }
            >
              ✕
            </button>
          </div>
          <div className="movie__info">
            <div className="movie__title">{movie.nameRu}</div>
            <div className="movie__details">
              {movie.countries?.map((c) => c.country).join(', ') ||
                'Неизвестно'}{' '}
              - {movie.year}
            </div>
            <div className="movie__category">
              {movie.genres?.map((g) => g.genre).join(', ') || 'Неизвестно'}
            </div>
            <a
              href={`https://kinopoisk.ru/film/${movie.kinopoiskId || movie.filmId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="movie__watch-button">Смотреть</button>
            </a>
            <div
              className={`movie__average movie__average--${getClassByRate(movie.normalizedRating)}`}
            >
              {movie.normalizedRating}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SelectedMoviesList;
