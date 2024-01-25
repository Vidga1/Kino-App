interface Country {
  id: string;
  country: string;
}

interface Genre {
  id: string;
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

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

interface MoviesResponse {
  films: Movie[];
  pagesCount: number;
}

interface SearchParams {
  keyword?: string;
  countries?: string;
  genres?: string;
  order?: string;
  type?: string;
  ratingFrom?: string;
  ratingTo?: string;
  yearFrom?: string;
  yearTo?: string;
}

interface FilterOptions {
  countries: Country[];
  genres: Genre[];
}
