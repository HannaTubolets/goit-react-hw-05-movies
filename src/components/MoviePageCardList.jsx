import PropTypes from 'prop-types';
import { MovieItemCard } from './MovieItemCard/MovieItemCard';
import css from '../pages/MoviesPage/MoviesPage.module.css';

export function MoviePageCardList({ searchMovies }) {
  return (
    <ul className={css.MovieGallery}>
      {searchMovies.map(({ id, title, release_date, name, poster_path }) => (
        <MovieItemCard
          key={id}
          id={id}
          release_date={release_date}
          title={title}
          name={name}
          poster_path={poster_path}
        />
      ))}
    </ul>
  );
}

MoviePageCardList.propTypes = {
  searchMovies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string,
      name: PropTypes.string,
      poster_path: PropTypes.string,
    })
  ),
};
