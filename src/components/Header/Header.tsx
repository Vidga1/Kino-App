import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__content">
        <Link to="/home" className="header__logo">
          На главную
        </Link>
      </div>
      <div className="header__content">
        <Link to="/about" className="header__logo">
          О проекте
        </Link>
      </div>
      <div className="header__content">
        <Link to="/playlists" className="header__logo">
          Список моих фильмов
        </Link>
      </div>
      <div className="header__content">
        <Link to="/auth" className="header__logo">
          Выйти из аккаунта
        </Link>
      </div>
    </header>
  );
};

export default Header;
