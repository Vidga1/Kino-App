import { API_KEY, API_URL_SEARCH } from './URL_KEY';

export const fetchMoviesByTitle = async (title: string, page = 1) => {
  const url = `${API_URL_SEARCH}${encodeURIComponent(title)}&page=${page}`;
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
  console.log('Результаты поиска:', data.films);
  return {
    films: data.films,
    pagesCount: data.pagesCount,
  };
};
