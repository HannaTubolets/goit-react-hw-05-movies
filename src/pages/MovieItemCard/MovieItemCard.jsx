import PropTypes from 'prop-types';
import { NavLink, useLocation } from 'react-router-dom';
import css from '../MovieItemCard/MovieItemCard.module.css';

export function MovieItemCard({
  id,
  title,
  poster_path,
  overview,
  release_date,
  vote_average,
  genres,
}) {
  const location = useLocation();

  return (
    <li key={id} className={css.MovieGalleryItem}>
      <NavLink
        to={`/movies/${id}`}
        state={{ from: location }}
        className={css.NavLink}
      >
        <img
          className={css.MovieGalleryItemImage}
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : '../../images/image_not_available.png'
          }
          alt={title}
          min-width={'100px'}
        />
        <div>
          <h2>{title}</h2>
          <p>{overview}</p>
          <p>{release_date}</p>
          <p>{vote_average}</p>
          <p>{genres}</p>
        </div>
      </NavLink>
    </li>
  );
}

MovieItemCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  poster_path: PropTypes.string,
  overview: PropTypes.string.isRequired,
  release_date: PropTypes.string.isRequired,
  vote_average: PropTypes.number.isRequired,
  genres: PropTypes.string.isRequired,
};
