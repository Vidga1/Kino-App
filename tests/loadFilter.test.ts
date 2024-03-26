import { loadFilterOptions } from '../src/Api/loadFilter';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

test('loadFilterOptions возвращает данные при успешном ответе', async () => {
  const mockData = {
    countries: [{ id: 'ru', country: 'Россия' }],
    genres: [{ id: 'drama', genre: 'Драма' }],
  };

  fetchMock.mockResponseOnce(JSON.stringify(mockData));

  const data = await loadFilterOptions();

  expect(data).toEqual(mockData);
});

test('loadFilterOptions выбрасывает ошибку при неудачном HTTP-ответе', async () => {
  fetchMock.mockResponseOnce(JSON.stringify({}), { status: 404 });

  await expect(loadFilterOptions()).rejects.toThrow('Ошибка HTTP: 404');
});

test('loadFilterOptions обрабатывает исключения при запросе', async () => {
  fetchMock.mockReject(new Error('Ошибка сети'));

  const consoleSpy = jest.spyOn(console, 'error');
  await loadFilterOptions();

  expect(consoleSpy).toHaveBeenCalledWith(
    'Ошибка при загрузке фильтров:',
    expect.any(Error),
  );
});
