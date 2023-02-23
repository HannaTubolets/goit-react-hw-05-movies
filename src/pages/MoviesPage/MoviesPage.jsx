import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchedMovies } from '../../services/Api';
import { MoviePageCardList } from '../MoviesPage/MoviePageCardList';
import css from '../MoviesPage/MoviesPage.module.css';

export default function MoviesPage() {
  const [search, setSearch] = useState('');
  const [searchSubmit, setSearchSubmit] = useState('');
  const [searchMovies, setSearchMovies] = useState([]);
  const [searchParam, setSearchParam] = useSearchParams();

  useEffect(() => {
    if (searchParam.has('query')) {
      setSearchSubmit(searchParam.get('query'));
    }
    return () => {
      setSearchMovies([]);
    };
  }, [searchParam]);

  useEffect(() => {
    if (searchSubmit === '') {
      return;
    }
    const searchMovie = async () => {
      await getSearchedMovies(searchSubmit)
        .then(data => {
          if (data.results.length > 0) {
            setSearchMovies(data.results);
            return;
          }
          throw Error();
        })
        .catch(error => {
          alert('Movie not found');
          console.log(error);
        });
    };
    searchMovie();
  }, [searchSubmit]);

  const handleSearch = event => {
    setSearch(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    setSearchSubmit(search);

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
