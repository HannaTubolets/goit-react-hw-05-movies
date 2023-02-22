import { useState, useEffect } from 'react';
import { useParams, Outlet, useLocation, NavLink } from 'react-router-dom';
import { getMovieDetails } from '../../services/Api';
import { Loader } from '../../components/Loader/Loader';
import css from '../MovieDetailsPage/MovieDetails.module.css';

export default function MovieDetailsPage() {
  const [movies, setMovies] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  let { moviesId } = useParams();

  const location = useLocation();
  const locationFrom = location?.state?.from ?? '/';

  useEffect(() => {
    const oneMovie = async () => {
      setIsLoading(true);
      try {
        await getMovieDetails(moviesId).then(data => {
          setMovies(data);
          console.log(data);
        });
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    oneMovie();
  }, [moviesId]);

  const releaseData = new Date(movies.release_date);
  const { release_date, title, vote_average, overview, genres, poster_path } =
    movies;

  return (
    <>
      <NavLink to={locationFrom} className={css.BackBtn}>
        👈   BACK
      </NavLink>
      {isLoading && <Loader />}
      {error && <h1>Sory, there is nothing 🙁, try again</h1>}
      {!error && (
        <section className={css.Section}>
          <img
            className={css.MovieImg}
            src={
              poster_path
                ? `https://image.tmdb.org/t/p/w300${poster_path}`
                : new URL(
                    '../../images/image_not_available.png',
                    import.meta.url
                  )
            }
            alt={title}
            max-width={'240px'}
          />

          <div className={css.Container}>
            <h2 className={css.MovieTitle}>
              {title} ({releaseData.getFullYear(release_date)})
            </h2>
            <h3>
              User score:
              <span className={css.GenreName}> {vote_average * 10}%</span>
            </h3>
            <h3>Genres:</h3>
            <ul className={css.GenresList}>
              {genres &&
                genres.map(({ name }) => (
                  <h3 className={css.GenreName} key={name}>
                    {name}
                  </h3>
                ))}
            </ul>
            <h3>Overview </h3>
            {overview ? (
              <p className={css.Txt}>{overview}</p>
            ) : (
              <p className={css.Txt}>No overview</p>
            )}
          </div>
        </section>
      )}
      {!error && (
        <section className={css.DownSection}>
          <NavLink
            className={css.CastLink}
            to={`cast`}
            state={{ from: locationFrom }}
          >
            Cast
          </NavLink>
          <NavLink
            className={css.ReviewsLink}
            to={`reviews`}
            state={{ from: locationFrom }}
          >
            Reviews
          </NavLink>
        </section>
      )}
      <section>
        <Outlet />
      </section>
    </>
  );
}
