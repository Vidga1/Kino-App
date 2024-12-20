import { API_URL_FILTER } from './constants';

export async function loadFilterOptions() {
  try {
    const response = await fetch(`${API_URL_FILTER}/filters`, {
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': process.env.REACT_APP_KINOPOISK_API_KEY!,
      },
    });

    if (!response.ok) {
      return Promise.reject(new Error(`Ошибка HTTP: ${response.status}`));
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка при загрузке фильтров:', error);
  }
}
