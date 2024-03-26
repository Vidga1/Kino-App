import { getClassByRate } from '../src/helpers/getClassByRate';

describe('getClassByRate', () => {
  test('returns "blue" for string ratings ending with "%"', () => {
    expect(getClassByRate('75%')).toBe('blue');
  });

  test('returns "green" for numeric ratings greater than or equal to 7', () => {
    expect(getClassByRate(7)).toBe('green');
    expect(getClassByRate('8.5')).toBe('green');
  });

  test('returns "orange" for numeric ratings greater than 3 and less than 7', () => {
    expect(getClassByRate(4)).toBe('orange');
    expect(getClassByRate('6.9')).toBe('orange');
  });

  test('returns "red" for numeric ratings less than or equal to 3', () => {
    expect(getClassByRate(3)).toBe('red');
    expect(getClassByRate('2.5')).toBe('red');
  });

  test('returns "default" for non-numeric strings', () => {
    expect(getClassByRate('NaN')).toBe('default');
  });

  test('returns "default" for strings without a percentage sign but containing numbers', () => {
    expect(getClassByRate('75')).toBe('green');
  });
});
