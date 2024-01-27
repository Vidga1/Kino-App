import React from 'react';
import '../../styles/MovieList.css';

const getClassByRate = (rating: number | string) => {
  const numericRating =
    typeof rating === 'string' && !rating.endsWith('%')
      ? parseFloat(rating)
      : rating;

  if (typeof numericRating === 'number') {
    if (numericRating >= 7) {
      return 'green';
    } else if (numericRating > 5) {
      return 'orange';
    } else {
      return 'red';
    }
  } else if (typeof rating === 'string' && rating.endsWith('%')) {
    return 'blue';
  }
  return 'default';
};

const MovieList: React.FC<MovieListProps> = ({ movies, onMovieSelect }) => {
  if (!Array.isArray(movies)) {
    return <div>Загрузка фильмов...</div>;
  }
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
            <div className="movie__title" onClick={() => onMovieSelect(movie)}>
              {movie.nameRu}
            </div>
            <div className="movie__details">
              {movie.countries.map((c) => c.country).join(', ')} - {movie.year}
            </div>
            <div className="movie__category">
              {movie.genres.map((g) => g.genre).join(', ')}
            </div>
          </div>
          <div
            className={`movie__average movie__average--${getClassByRate(movie.rating)}`}
          >
            {movie.rating}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
