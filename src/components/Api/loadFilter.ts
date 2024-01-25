import { API_KEY, API_URL_FILTER } from './URL_KEY';

export async function loadFilterOptions() {
  try {
    const response = await fetch(`${API_URL_FILTER}/filters`, {
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка при загрузке фильтров:', error);
  }
}
