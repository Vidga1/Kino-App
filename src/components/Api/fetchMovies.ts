const API_KEY = '8c8e1a50-6322-4135-8875-5d40a5420d86';
const API_URL_POPULAR =
  'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS';

const API_URL_MOVIE_DETAILS =
  'https://kinopoiskapiunofficial.tech/api/v2.2/films/';

export const fetchMovies = async (
  page: number = 1,
): Promise<MoviesResponse> => {
  const url = `${API_URL_POPULAR}&page=${page}`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': API_KEY,
    },
  });
  if (!response.ok) {
    throw new Error(`Ошибка HTTP: ${response.status}`);
  }
  const data = await response.json();
  console.log('Полученные фильмы:', data.films);
  return {
    films: data.films,
    pagesCount: data.pagesCount,
  };
};

export const fetchMovieDetails = async (
  movieId: number,
): Promise<MovieDetails> => {
  try {
    const url = `${API_URL_MOVIE_DETAILS}${movieId}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': API_KEY,
      },
    });
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }
    const movieDetailsData = await response.json();

    const movieDetails: MovieDetails = {
      filmId: movieDetailsData.filmId,
      kinopoiskId: movieDetailsData.kinopoiskId,
      nameRu: movieDetailsData.nameRu,
      description: movieDetailsData.description || '',
      year: movieDetailsData.year,
      posterUrl: movieDetailsData.posterUrl || '',
      posterUrlPreview: movieDetailsData.posterUrlPreview || '',
      countries: movieDetailsData.countries || [],
      genres: movieDetailsData.genres || [],
      rating: movieDetailsData.rating || 0,
      filmLength: movieDetailsData.filmLength,
      webUrl: movieDetailsData.webUrl,
    };

    return movieDetails;
  } catch (error) {
    console.error('Ошибка при загрузке деталей фильма:', error);
    throw error;
  }
};
