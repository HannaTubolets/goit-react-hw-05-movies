import { useState, useEffect } from 'react';
import { useParams, Outlet, useLocation, NavLink } from 'react-router-dom';
import { getMovieDetails } from '../../services/Api';
// import noPhoto from '../../images/noPhoto.png';
import { Loader } from '../../components/Loader/Loader';

export default function MovieDetailsPage() {
  const [movies, setMovies] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  let { moviesId } = useParams();

  const location = useLocation();
  const locationFrom = location?.state?.from ?? '/';

  useEffect(() => {
    const oneMovie = async () => {
      setLoading(true);
      try {
        await getMovieDetails(moviesId).then(data => {
          setMovies(data);
        });
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    oneMovie();
  }, [moviesId]);

  const releaseData = new Date(movies.release_date);
  const { release_date, title, vote_average, overview, genres, poster_path } =
    movies;

  return (
    <>
      <NavLink to={locationFrom}> ◀ BACK </NavLink>
      {loading && <Loader />}
      {error && <h1>Sory, there is nothing, try again</h1>}
      {!error && (
        <section>
          <img
            src={
              poster_path
                ? `https://image.tmdb.org/t/p/w300${poster_path}`
                : '../../images/image_not_available.png'
            }
            alt={title}
            min-width={'100px'}
          />

          <div>
            <h2>
              {title} ({releaseData.getFullYear(release_date)})
            </h2>
            <h3>User score: {vote_average * 10}%</h3>
            <h3>Genres:</h3>
            <ul>
              {genres &&
                genres.map(({ name }) => <h3 key={name}>🎥 {name} |</h3>)}
            </ul>
            <h3>Overview </h3>
            {overview ? <p>{overview}</p> : <p>No overview</p>}
          </div>
        </section>
      )}
      {!error && (
        <section>
          <NavLink
            to={`/movies/${moviesId}/cast`}
            state={{ from: locationFrom }}
          >
            Cast
          </NavLink>
          <NavLink
            to={`/movies/${moviesId}/reviews`}
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
