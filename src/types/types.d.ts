// src/types/Movie.d.ts

interface Country {
  id: string;
  country: string;
}

interface Genre {
  id: string;
  genre: string;
}

interface Movie {
  ratingKinopoisk: number;
  ratingImdb?: number;
  filmId: number;
  kinopoiskId?: number;
  nameRu: string;
  posterUrlPreview?: string;
  year: string;
  countries: Country[];
  genres: Genre[];
  rating: number | string;
}

interface MovieDetails extends Movie {
  description: string;
  posterUrl: string;
  filmLength?: number;
  webUrl?: string;
  // Дополнительные свойства, если есть
}

type MovieSelect = {
  normalizedRating: React.ReactNode;
  ratingKinopoisk: number;
  ratingImdb: number;
  kinopoiskId?: number;
  filmId?: number;
  nameRu?: string;
  posterUrlPreview?: string;
  year?: string;
  countries?: Array<{ country: string }>;
  genres?: Array<{ genre: string }>;
  rating?: string;
};

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

interface HeaderProps {
  onSearch: (isActive: boolean) => void;
}

interface SearchFilterFormProps {
  onSearchResults: (
    movies: Movie[],
    totalPages: number,
    searchParams: SearchParams,
  ) => void;
}

interface Filters {
  [key: string]: string | undefined;
  countries?: string;
  genres?: string;
  order?: string;
  type?: string;
  ratingFrom?: string;
  ratingTo?: string;
  yearFrom?: string;
  yearTo?: string;
}

type SelectedMovies = {
  [key: string]: Movie;
};

interface SelectedMoviesListProps {
  currentPage: number;
  moviesPerPage: number;
}

interface MovieCardProps {
  movie: Movie;
  isSelected: boolean;
  onToggleSelect?: (movie: Movie) => Promise<void>;
  onRemove?: (movieId: number) => Promise<void>;
  onMovieSelect?: (movie: Movie) => void;
  showWatchButton?: boolean;
}

interface AuthFormProps {
  mode: 'login' | 'signup';
}

interface AuthContextType {
  currentUser: User | null;
}

interface AuthProviderProps {
  children: ReactNode;
}
