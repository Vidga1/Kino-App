import React from 'react';
import '../../styles/Modal.css';

const Modal: React.FC<ModalProps> = ({ movie, onClose, isModalOpen }) => {
  return (
    <div className={`modal ${isModalOpen ? 'modal--show' : ''}`}>
      <div className="modal__card">
        <img
          className="modal__movie-backdrop"
          src={movie.posterUrl}
          alt={movie.nameRu}
        />
        <h2>
          <span className="modal__movie-title">{movie.nameRu}</span>
          <span className="modal__movie-release-year"> - {movie.year}</span>
        </h2>
        <ul className="modal__movie-info">
          <li className="modal__movie-genre">
            Жанр -{' '}
            {movie.genres.map((el) => (
              <span key={el.genre}>{el.genre}</span>
            ))}
          </li>
          {movie.filmLength && (
            <li className="modal__movie-runtime">
              Время - {movie.filmLength} минут
            </li>
          )}
          {movie.webUrl && (
            <li>
              Сайт:{' '}
              <a className="modal__movie-site" href={movie.webUrl}>
                {movie.webUrl}
              </a>
            </li>
          )}
          <li className="modal__movie-overview">
            Описание - {movie.description}
          </li>
        </ul>
        <button type="button" className="modal__button-close" onClick={onClose}>
          Закрыть
        </button>
      </div>
    </div>
  );
};

export default Modal;
