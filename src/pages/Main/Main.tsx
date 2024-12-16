import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import {
  fetchMoviesByTitle,
  fetchMoviesByFilters,
} from '../../Api/searchMovies';
import SearchForms from '../../components/SearchForm/SearchForms';
import MovieList from '../../components/MovieList/MovieList';
import Modal from '../../components/Modal/Modal';
import Pagination from '../../components/Pagination/Pagination';
import { fetchMovieDetails, fetchMovies } from '../../Api/getMovies';

// Функция для удаления дубликатов вынесена за пределы компонента
function deduplicateMovies(films: Movie[]): Movie[] {
  const seen = new Set<number>();
  const unique: Movie[] = [];
  for (const f of films) {
    const id = f.kinopoiskId || f.filmId;
    if (id && !seen.has(id)) {
      seen.add(id);
      unique.push(f);
    }
  }
  return unique;
}

const HomePage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);
  const location = useLocation();

  const cacheRef = useRef<Map<string, Map<number, Movie[]>>>(new Map());

  const handleSearchResults = useCallback(
    (
      newMovies: Movie[],
      newTotalPages: number,
      newSearchParams: SearchParams,
    ) => {
      setCurrentPage(1);
      setTotalPages(newTotalPages);
      setSearchParams(newSearchParams);
      setMovies(deduplicateMovies(newMovies));
    },
    [],
  );

  useEffect(() => {
    document.body.classList.toggle('stop-scrolling', isModalOpen);
    return () => {
      document.body.classList.remove('stop-scrolling');
    };
  }, [isModalOpen]);

  const getCacheKey = useCallback(() => {
    const searchParamsObj = new URLSearchParams(location.search);

    if (location.pathname.includes('/filters')) {
      return JSON.stringify({ type: 'filters', params: location.search });
    } else if (
      location.pathname.includes('/search') &&
      searchParamsObj.has('query')
    ) {
      return JSON.stringify({
        type: 'search',
        query: searchParamsObj.get('query'),
      });
    } else {
      return 'popular';
    }
  }, [location]);

  const loadMoviesPage = useCallback(
    async (page: number) => {
      const cacheKey = getCacheKey();
      if (!cacheRef.current.has(cacheKey)) {
        cacheRef.current.set(cacheKey, new Map());
      }
      const pageCache = cacheRef.current.get(cacheKey)!;

      if (pageCache.has(page)) {
        return pageCache.get(page)!;
      }

      const searchParamsObj = new URLSearchParams(location.search);
      let response;

      if (location.pathname.includes('/filters')) {
        const filters = Object.fromEntries(searchParamsObj.entries());
        response = await fetchMoviesByFilters(filters, page);
      } else if (
        location.pathname.includes('/search') &&
        searchParamsObj.has('query')
      ) {
        const query = searchParamsObj.get('query') || '';
        response = await fetchMoviesByTitle(query, page);
      } else {
        response = await fetchMovies(page);
      }

      setTotalPages(response.pagesCount);
      const uniqueFilms = deduplicateMovies(response.films);
      pageCache.set(page, uniqueFilms);
      return uniqueFilms;
    },
    [getCacheKey, location], // Добавили getCacheKey и location в зависимости
  );

  useEffect(() => {
    (async () => {
      const films = await loadMoviesPage(currentPage);
      setMovies(films);
    })();
  }, [currentPage, location, loadMoviesPage]); // Добавили loadMoviesPage в зависимости

  const handleMovieSelect = useCallback(async (movie: Movie) => {
    const movieId = movie.kinopoiskId || movie.filmId;
    if (movieId) {
      try {
        const movieDetails = await fetchMovieDetails(movieId);
        setSelectedMovie(movieDetails);
        setIsModalOpen(true);
      } catch (error) {
        console.error('Ошибка при загрузке деталей фильма:', error);
      }
    } else {
      console.error('Ошибка: Идентификатор фильма не найден');
    }
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  }, []);

  return (
    <div>
      <SearchForms onSearchResults={handleSearchResults} />
      <MovieList movies={movies} onMovieSelect={handleMovieSelect} />
      {isModalOpen && selectedMovie && (
        <Modal
          movie={selectedMovie}
          onClose={handleCloseModal}
          isModalOpen={isModalOpen}
        />
      )}
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default HomePage;
