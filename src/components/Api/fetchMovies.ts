const API_KEY = '8c8e1a50-6322-4135-8875-5d40a5420d86';
const API_URL_POPULAR =
  'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS';

const fetchMovies = async (): Promise<Movie[]> => {
  const response = await fetch(API_URL_POPULAR, {
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': API_KEY,
    },
  });
  const data = await response.json();
  return data.films;
};

export default fetchMovies;
