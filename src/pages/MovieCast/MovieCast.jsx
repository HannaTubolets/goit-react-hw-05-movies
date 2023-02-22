import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCredits } from '../../services/Api';
import { Loader } from '../../components/Loader/Loader';
import css from '../MovieCast/MovieCast.module.css';

export default function Cast() {
  const [actors, setActors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { moviesId } = useParams();

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      try {
        await getMovieCredits(moviesId).then(data => setActors(data.cast));
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, [moviesId]);

  const showNoActors = !isLoading && actors.length === 0;

  return (
    <>
      {isLoading && <Loader />}
      {showNoActors && <h1>No actors for this movie</h1>}
      {!error &&
        actors &&
        actors.map(({ id, character, name, profile_path }) => (
          <div className={css.CastSection}>
            <div key={id} className={css.ActorCard}>
              <img
                className={css.MovieCastImg}
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w300${profile_path}`
                    : new URL(
                        '../../images/image_not_available.png',
                        import.meta.url
                      )
                }
                alt=""
              />

              {name ? (
                <h2 className={css.ActorName}>{name}</h2>
              ) : (
                <h2>No actor`s name</h2>
              )}
              {character ? (
                <h3 className={css.ActorCharacter}>{character}</h3>
              ) : (
                <h3 className={css.NoInfo}>No actor`s character</h3>
              )}
            </div>
          </div>
        ))}
    </>
  );
}

Cast.propTypes = {
  searchFilms: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      character: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      profile_path: PropTypes.string.isRequired,
      backdrop_path: PropTypes.string.isRequired,
    })
  ),
};
