import { API_KEY, API_URL_SEARCH_NAME, API_URL_SEARCH_FILTER } from './URL_KEY';

export const fetchMoviesByTitle = async (title: string, page = 1) => {
  const url = `${API_URL_SEARCH_NAME}${encodeURIComponent(title)}&page=${page}`;
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

  const maxPages = 20;
  const limitedPagesCount = Math.min(data.pagesCount, maxPages);

  console.log('Результаты поиска:', data.films);
  return {
    films: data.films,
    pagesCount: limitedPagesCount,
  };
};

export const fetchMoviesByFilters = async (filters: Filters, page = 1) => {
  const url = new URL(API_URL_SEARCH_FILTER);
  url.searchParams.append('page', page.toString());

  Object.keys(filters).forEach((key) => {
    const value = filters[key];
    if (value) {
      url.searchParams.append(key, value);
    }
  });

  console.log('URL запроса:', url.toString());

  const response = await fetch(url.toString(), {
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error(`Ошибка HTTP: ${response.status}`);
  }

  const data = await response.json();
  console.log('Статус ответа:', response.status);
  console.log('Ответ сервера:', data);

  return {
    films: data.items,
    pagesCount: data.totalPages,
  };
};
