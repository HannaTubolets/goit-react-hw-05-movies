import PropTypes from 'prop-types';
import { MovieItemCard } from 'pages/MovieItemCard/MovieItemCard';
import css from './MovieCardList.module.css';

export function MovieCardList({ movies }) {
  console.log(movies);
  return (
    <ul className={css.MovieGallery}>
      {movies.map(
        ({
          id,
          title,
          poster_path,
          overview,
          release_date,
          vote_average,
          genres,
        }) => (
          <MovieItemCard
            key={id}
            id={id}
            release_date={release_date}
            title={title}
            poster_path={poster_path}
            // overview={overview}
            // vote_average={vote_average}
            // genres={genres}
          />
        )
      )}
    </ul>
  );
}

MovieCardList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      poster_path: PropTypes.string.isRequired,
      overview: PropTypes.string.isRequired,
      release_date: PropTypes.string.isRequired,
      vote_average: PropTypes.number.isRequired,
      genres: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
};
