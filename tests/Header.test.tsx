import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import Header from '../src/components/Header/Header'; 

describe('Header Component', () => {
  test('отображает компонент Header', () => {
    const { getByText } = render(
      <Router>
        <Header />
      </Router>
    );

    expect(getByText('На главную')).toBeInTheDocument();
    expect(getByText('Список моих фильмов')).toBeInTheDocument();
  });

  test('перезагрузка страницы при клике на "На главную"', () => {
    const reloadMock = jest.fn();
  
    // Мокаем window.location с использованием Object.defineProperty
    Object.defineProperty(window, 'location', {
      value: {
        reload: reloadMock,
      },
      writable: true,
    });
  
    const { getByText } = render(
      <Router>
        <Header />
      </Router>
    );
  
    fireEvent.click(getByText('На главную'));
    expect(reloadMock).toHaveBeenCalled();
  });

  test('наличие ссылки на список фильмов', () => {
    const { getByText } = render(
      <Router>
        <Header />
      </Router>
    );

    expect(getByText('Список моих фильмов').closest('a')).toHaveAttribute('href', '/playlists');
  });
});