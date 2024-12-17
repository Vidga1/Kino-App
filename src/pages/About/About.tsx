import React from 'react';
import { Container, Typography } from '@mui/material';

const AboutPage = () => {
  return (
    <Container sx={{ mt: 4, color: '#ffffff' }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontSize: '2rem' }}
      >
        О проекте
      </Typography>

      <Typography
        variant="body1"
        component="p"
        sx={{ mb: 2, fontSize: '1.4rem', lineHeight: 1.6 }}
      >
        Этот проект — настоящий помощник для любителей кино. Здесь можно найти
        информацию о многих фильмах: от самых новых до самых старых. Проект
        позволяет искать фильмы по названиям, жанрам и странам, рейтингу и году,
        делая процесс выбора фильма для просмотра простым и увлекательным.
      </Typography>

      <Typography
        variant="body1"
        component="p"
        sx={{ mb: 2, fontSize: '1.4rem', lineHeight: 1.6 }}
      >
        В разработке этого сайта использовались передовые технологии, такие как
        React для создания интерфейса и Firebase как платформа для хранения
        данных. Особое внимание уделено применению TypeScript — современного
        инструмента, который делает код более строгим и безопасным, помогая
        избежать многих ошибок еще на этапе написания программы.
      </Typography>

      <Typography
        variant="body1"
        component="p"
        sx={{ mb: 2, fontSize: '1.4rem', lineHeight: 1.6 }}
      >
        Для получения информации о фильмах проект использует API КиноПоиска, что
        позволяет предоставлять актуальные и подробные данные о киноновинках и
        классике кинематографа. Благодаря этому, пользователи имеют доступ к
        обширной базе данных фильмов прямо на сайте.
      </Typography>

      <Typography
        variant="body1"
        component="p"
        sx={{ mb: 2, fontSize: '1.4rem', lineHeight: 1.6 }}
      >
        Главной целью проекта было создать что-то, что не только помогло бы
        закрепить знания по разработке вэб-приложений, но и было бы полезным и
        интересным для пользователей. Этот сайт станет отличным ресурсом для
        всех, кто любит кино.
      </Typography>
    </Container>
  );
};

export default AboutPage;
