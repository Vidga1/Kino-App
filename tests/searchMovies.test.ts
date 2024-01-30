import {
  fetchMoviesByTitle,
  fetchMoviesByFilters,
} from '../src/components/Api/searchMovies';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

test('fetchMoviesByTitle возвращает данные при успешном ответе', async () => {
  const mockData = {
    films: [{ id: 1, title: 'Тестовый фильм' }],
    pagesCount: 3,
  };

  fetchMock.mockResponseOnce(JSON.stringify(mockData));

  const response = await fetchMoviesByTitle('Тестовый', 1);

  expect(response.films).toEqual(mockData.films);
  expect(response.pagesCount).toBe(3);
});

test('fetchMoviesByTitle выбрасывает ошибку при неудачном HTTP-ответе', async () => {
  fetchMock.mockResponseOnce(JSON.stringify({}), { status: 404 });

  await expect(fetchMoviesByTitle('Тестовый', 1)).rejects.toThrow(
    'Ошибка HTTP: 404',
  );
});

test('fetchMoviesByFilters возвращает данные при успешном ответе', async () => {
  const mockData = {
    items: [{ id: 1, title: 'Тестовый фильм' }],
    totalPages: 5,
  };

  fetchMock.mockResponseOnce(JSON.stringify(mockData));

  const filters = { genre: 'драма', year: '2024' };
  const response = await fetchMoviesByFilters(filters, 1);

  expect(response.films).toEqual(mockData.items);
  expect(response.pagesCount).toBe(mockData.totalPages);
});

test('fetchMoviesByFilters выбрасывает ошибку при неудачном HTTP-ответе', async () => {
  fetchMock.mockResponseOnce(JSON.stringify({}), { status: 404 });

  await expect(fetchMoviesByFilters({}, 1)).rejects.toThrow('Ошибка HTTP: 404');
});
