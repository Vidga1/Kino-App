import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Pagination from '../src/components/Pagination/Pagination';

describe('Pagination Component', () => {
  test('отображает правильное количество страниц', () => {
    const totalPages = 10;
    const currentPage = 5;
    const { getAllByRole } = render(
      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={() => {}} />
    );

    const pageItems = getAllByRole('listitem');
    expect(pageItems).toHaveLength(7); 
  });

  test('выделяет текущую страницу как активную', () => {
    const currentPage = 5;
    const { getByText } = render(
      <Pagination totalPages={10} currentPage={currentPage} onPageChange={() => {}} />
    );

    const activePageItem = getByText(currentPage).parentNode;
    expect(activePageItem).toHaveClass('pagination__item--active');
  });

  test('вызывает onPageChange при клике на номер страницы', () => {
    const onPageChange = jest.fn();
    const { getByText } = render(
      <Pagination totalPages={10} currentPage={5} onPageChange={onPageChange} />
    );

    const pageToClick = 3;
    fireEvent.click(getByText(pageToClick));
    expect(onPageChange).toHaveBeenCalledWith(pageToClick);
  });
});