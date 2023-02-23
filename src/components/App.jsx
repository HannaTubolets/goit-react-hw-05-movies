import { Routes, Route, Navigate } from 'react-router-dom';
// import  HomePage  from '../pages/HomePage/HomePage';
// import MoviesPage from '../pages/MoviesPage/MoviesPage';
// import MovieDetailsPage from '../pages/MovieDetailsPage/MovieDetailsPage';
// import  Header  from '../pages/Header/Header';
// import Cast from '../pages/MovieCast/MovieCast';
// import Reviews from '../pages/MovieReviews/MovieReviews';

import { lazy, Suspense } from 'react';
import { Loader } from './Loader/Loader';
const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('../pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() =>
  import('../pages/MovieDetailsPage/MovieDetailsPage')
);
const Header = lazy(() => import('./Header/Header'));
const Cast = lazy(() => import('../pages/MovieCast/MovieCast'));
const Reviews = lazy(() => import('../pages/MovieReviews/MovieReviews'));

export const App = () => {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<HomePage />} />
            <Route path="movies" element={<MoviesPage />} />
            <Route path="movies/:moviesId" element={<MovieDetailsPage />}>
              <Route path="cast" element={<Cast />} />
              <Route path="reviews" element={<Reviews />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
      </Suspense>
    </div>
  );
};
