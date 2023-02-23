import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchedMovies } from '../../services/Api';
import { MoviePageCardList } from '../../components/MoviePageCardList';
import css from '../MoviesPage/MoviesPage.module.css';

export default function MoviesPage() {
  const [search, setSearch] = useState('');

  const [searchMovies, setSearchMovies] = useState([]);
  const [searchParam, setSearchParam] = useSearchParams();

  const movieQuery = searchParam.get('query') || '';

  useEffect(() => {
    if (!movieQuery) {
      return;
    }

    const searchMovie = async () => {
      await getSearchedMovies(movieQuery)
        .then(data => {
          if (data.results.length > 0) {
            setSearchMovies(data.results);
            return;
          }
          throw Error();
        })
        .catch(error => {
          alert('Movie not found');
          console.log(error.message);
        });
    };
    searchMovie();
  }, [movieQuery]);

  const handleSearch = event => {
    setSearch(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    setSearchParam(search);

    if (search === '') {
      alert('Enter your search request please');
      return;
    }

    setSearchParam({ query: search });
    setSearch('');
  };

  return (
    <>
      <form className={css.MovieForm} onSubmit={handleSubmit}>
        <input
          className={css.MovieFormInput}
          onChange={handleSearch}
          value={search}
          placeholder="Search movies..."
        />
        <button className={css.MovieFormBtn} type="submit">
          Search
        </button>
      </form>
      {searchMovies && <MoviePageCardList searchMovies={searchMovies} />}
    </>
  );
}
