import axios from 'axios';
import PropTypes from 'prop-types';

const BASE_URL = 'https://api.themoviedb.org/3/';
const KEY = 'e32f5431d23ebe7deb7fe030b4ef583a';

// https://api.themoviedb.org/3/movie/550?api_key=e32f5431d23ebe7deb7fe030b4ef583a

async function fetchMovies(url = '', config = {}) {
  const { data } = await axios.get(url, config);
  return data;
}

export function getTrendMovies() {
  return fetchMovies(`${BASE_URL}/trending/movie/day?api_key=${KEY}`);
}

// console.log(getTrendMovies());

export function getSearchedMovies(query) {
  return fetchMovies(
    `${BASE_URL}search/movie?api_key=${KEY}&query=${query}&language=en-US&include_adult=false`
  );
}

export function getMovieDetails(movie_id) {
  return fetchMovies(
    `${BASE_URL}movie/${movie_id}?api_key=${KEY}&language=en-US`
  );
}

export function getMovieCredits(movie_id) {
  return fetchMovies(
    `${BASE_URL}movie/${movie_id}/credits?api_key=${KEY}&language=en-US`
  );
}

export function getMovieReviews(movie_id) {
  return fetchMovies(
    `${BASE_URL}movie/${movie_id}/reviews?api_key=${KEY}&language=en-US`
  );
}

getSearchedMovies.propTypes = {
  query: PropTypes.string.isRequired,
};

getMovieDetails.propTypes = {
  movie_id: PropTypes.number.isRequired,
};

getMovieReviews.propTypes = {
  movie_id: PropTypes.number.isRequired,
};

getMovieCredits.propTypes = {
  movie_id: PropTypes.number.isRequired,
};
