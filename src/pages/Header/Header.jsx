import { React } from 'react';
import { NavLink } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import css from './Header.module.css';

export default function Header() {
  return (
    <>
      <header className={css.Header}>
        <div>
          <nav className={css.NavWrapper}>
            <NavLink
              className={({ isActive }) =>
                `${css.NavLink} ${isActive ? css.active : ''}`
              }
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `${css.NavLink} ${isActive ? css.active : ''}`
              }
              to="/movies"
            >
              Movies
            </NavLink>
          </nav>
        </div>
      </header>

      <Outlet />
    </>
  );
}
