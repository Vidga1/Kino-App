interface Country {
  country: string;
}

interface Genre {
  genre: string;
}

interface Movie {
  filmId: number;
  kinopoiskId?: number;
  nameRu: string;
  posterUrlPreview?: string;
  year: string;
  countries: Country[];
  genres: Genre[];
  rating: number;
}

interface MovieDetails extends Movie {
  description: string;
  posterUrl: string;
  filmLength?: number;
  webUrl?: string;
}

interface MovieListProps {
  movies: Movie[];
  onMovieSelect: (movie: Movie) => void;
}

interface ModalProps {
  movie: MovieDetails;
  onClose: () => void;
  isModalOpen: boolean;
}
