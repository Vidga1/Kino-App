import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="about-page">
      <Link to="/home" className="back-button">
        Назад
      </Link>
      <h1>О проекте</h1>
      <p>
        Этот проект — настоящий помощник для любителей кино. Здесь можно найти
        информацию о многих фильмах: от самых новых до самых старых. Проект
        позволяет искать фильмы по названиям, жанрам и странам, рейтингу и году,
        делая процесс выбора фильма для просмотра простым и увлекательным.
      </p>
      <p>
        В разработке этого сайта использовались передовые технологии, такие как
        React для создания интерфейса и Firebase как платформа для хранения
        данных. Особое внимание уделено применению TypeScript — современного
        инструмента, который делает код более строгим и безопасным, помогая
        избежать многих ошибок еще на этапе написания программы.
      </p>
      <p>
        Для получения информации о фильмах проект использует API КиноПоиска, что
        позволяет предоставлять актуальные и подробные данные о киноновинках и
        классике кинематографа. Благодаря этому, пользователи имеют доступ к
        обширной базе данных фильмов прямо на сайте.
      </p>
      <p>
        Главной целью проекта было создать что-то, что не только помогло бы
        закрепить знания по разработке вэб приложений, но и было бы полезным и
        интересным для пользователей. Этот сайт станет отличным ресурсом для
        всех, кто любит кино.
      </p>
    </div>
  );
};

export default AboutPage;