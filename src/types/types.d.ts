interface Country {
  country: string;
}

interface Genre {
  genre: string;
}

interface Movie {
  kinopoiskId: number;
  filmId?: number;
  nameRu: string;
  posterUrlPreview: string;
  year: string;
  countries: Country[];
  genres: Genre[];
  rating: number; // Убедитесь, что rating указан как number
}

interface MovieListProps {
  movies: Movie[];
}
