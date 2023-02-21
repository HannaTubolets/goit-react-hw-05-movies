import { React } from 'react';
import { NavLink } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import css from './Header.module.css';

export const Header = () => {
  return (
    <>
      <header className={css.Header}>
        <div>
          <div>
            <svg class={css.Logo} width="20" height="20">
              <use href="../../images/movie-icon.svg"></use>
            </svg>

            <nav className={css.navWrapper}>
              <NavLink className={css.NavLink} to="/">
                Home
              </NavLink>
              <NavLink className={css.NavLink} to="/movies">
                Movies
              </NavLink>
            </nav>
          </div>
        </div>
      </header>

      <Outlet />
    </>
  );
};
