import { useEffect, useState } from 'react';
import css from './HomePage.module.css';
import { getTrendMovies } from 'services/Api';
import { MovieCardList } from 'pages/MovieCardList/MovieCardList';

export const HomePage = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getTrendMovies().then(data => {
      setMovies(data.results);
      console.log(data);
    });
  }, []);

  return (
    <section className={css.Section}>
      <div>
        <h1 className={css.MainTitle}>Trending today</h1>
        <MovieCardList movies={movies} />
      </div>
    </section>
  );
};
