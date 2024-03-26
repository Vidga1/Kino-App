import { fetchMovies, fetchMovieDetails } from '../src/Api/getMovies';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

test('fetchMovies возвращает корректные данные', async () => {
  const mockMoviesData = {
    films: [
      {
        filmId: 1,
        kinopoiskId: 123,
        nameRu: 'Пример Фильма',
        posterUrlPreview: 'https://example.com/poster.jpg',
        year: '2024',
        countries: [{ id: 'ru', country: 'Россия' }],
        genres: [{ id: 'drama', genre: 'Драма' }],
        rating: 8.5,
        ratingKinopoisk: 8.2,
      },
    ],
    pagesCount: 1,
  };

  fetchMock.mockResponseOnce(JSON.stringify(mockMoviesData));

  const response = await fetchMovies(1);

  expect(response.films).toEqual(mockMoviesData.films);
  expect(response.pagesCount).toBe(mockMoviesData.pagesCount);
  expect(fetchMock.mock.calls.length).toEqual(1);
});

test('fetchMovies выбрасывает ошибку при неудачном запросе', async () => {
  fetchMock.mockReject(new Error('Ошибка API'));

  await expect(fetchMovies(1)).rejects.toThrow('Ошибка API');
});

test('fetchMovieDetails возвращает детали фильма', async () => {
  const mockMovieDetails = {
    filmId: 1,
    kinopoiskId: 123,
    nameRu: 'Пример Фильма',
    description: 'Описание фильма...',
    year: '2024',
    posterUrl: 'https://example.com/poster_large.jpg',
    posterUrlPreview: 'https://example.com/poster.jpg',
    countries: [{ id: 'ru', country: 'Россия' }],
    genres: [{ id: 'drama', genre: 'Драма' }],
    rating: 8.5,
    filmLength: 120,
    webUrl: 'https://example.com/movie',
  };

  fetchMock.mockResponseOnce(JSON.stringify(mockMovieDetails));

  const response = await fetchMovieDetails(123);

  expect(response).toEqual(mockMovieDetails);
});

test('fetchMovieDetails выбрасывает ошибку при неудачном запросе', async () => {
  fetchMock.mockReject(new Error('Ошибка API'));

  await expect(fetchMovieDetails(123)).rejects.toThrow('Ошибка API');
});
