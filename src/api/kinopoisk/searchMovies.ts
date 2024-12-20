import { API_URL_SEARCH_NAME, API_URL_SEARCH_FILTER } from './constants';

export const fetchMoviesByTitle = async (title: string, page = 1) => {
  const url = `${API_URL_SEARCH_NAME}${encodeURIComponent(title)}&page=${page}`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': process.env.REACT_APP_KINOPOISK_API_KEY!,
    },
  });
  if (!response.ok) {
    throw new Error(`Ошибка HTTP: ${response.status}`);
  }
  const data = await response.json();

  const maxPages = 20;
  const limitedPagesCount = Math.min(data.pagesCount, maxPages);

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

  const response = await fetch(url.toString(), {
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': process.env.REACT_APP_KINOPOISK_API_KEY!,
    },
  });

  if (!response.ok) {
    throw new Error(`Ошибка HTTP: ${response.status}`);
  }

  const data = await response.json();

  return {
    films: data.items,
    pagesCount: data.totalPages,
  };
};
