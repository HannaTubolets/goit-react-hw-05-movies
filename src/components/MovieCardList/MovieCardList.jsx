import PropTypes from 'prop-types';
import { MovieItemCard } from 'components/MovieItemCard/MovieItemCard';
import css from './MovieCardList.module.css';

export function MovieCardList({ movies }) {
  console.log(movies);
  return (
    <ul className={css.MovieGallery}>
      {movies.map(({ id, title, poster_path, release_date }) => (
        <MovieItemCard
          key={id}
          id={id}
          release_date={release_date}
          title={title}
          poster_path={poster_path}
        />
      ))}
    </ul>
  );
}

MovieCardList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      poster_path: PropTypes.string.isRequired,
      release_date: PropTypes.string.isRequired,
    })
  ).isRequired,
};
