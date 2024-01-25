import React from 'react';
import '../../styles/MovieList.css';

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  return (
    <div className="movies">
      {movies.map((movie) => (
        <div key={movie.kinopoiskId || movie.filmId} className="movie">
          <div className="movie__cover-inner">
            <img
              src={movie.posterUrlPreview}
              className="movie__cover"
              alt={movie.nameRu}
            />
          </div>
          <div className="movie__info">
            <div className="movie__title">{movie.nameRu}</div>
            <div className="movie__details">
              {movie.countries.map((c) => c.country).join(', ')} - {movie.year}
            </div>
            <div className="movie__category">
              {movie.genres.map((g) => g.genre).join(', ')}
            </div>
          </div>
          <div className="movie__average">{movie.rating}</div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
