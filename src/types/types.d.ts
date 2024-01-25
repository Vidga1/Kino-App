interface Movie {
  kinopoiskId: number;
  filmId?: number;
  nameRu: string;
  posterUrlPreview: string;
  year: string;
  countries: Array<{ country: string }>;
  genres: Array<{ genre: string }>;
  rating: string | number;
}

interface MovieListProps {
  movies: Movie[];
}

interface MoviesData {
  films: Movie[];
  totalPages: number;
}
