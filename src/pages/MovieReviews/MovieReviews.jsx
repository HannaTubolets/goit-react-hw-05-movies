import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../../services/Api';
import { Loader } from '../../components/Loader/Loader';
import css from '../MovieReviews/MovieReviews.module.css';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const { moviesId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      try {
        await getMovieReviews(moviesId).then(data => setReviews(data.results));
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, [moviesId]);

  const showNoReviews = !isLoading && reviews.length === 0;

  return (
    <>
      {isLoading && <Loader />}
      {showNoReviews && (
        <h3 className={css.NoReviews}>No reviews for this movie 🙁</h3>
      )}
      <ul className={css.ReviewList}>
        {!error &&
          reviews.map(review => (
            <li key={review.id} className={css.ReviewItem}>
              <h2 className={css.ReviewTitle}>{review.author} :</h2>
              <p>{review.content}</p>
            </li>
          ))}
      </ul>
    </>
  );
}

Reviews.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      author: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ),
};
