import { NavLink } from "react-router-dom";
import './LoggedUserNavigation.css';

const LoggedUserNavigation = ({ isBurger = false }) => {
  return (
    <>
      <ul className="navigation__list">
        { isBurger &&
          <li className="navigation__item">
            <NavLink to="/" className="navigation__link navigation__link_type_home">Гравная</NavLink>
          </li>
        }

        <li className="navigation__item">
          <NavLink
            to="/movies"
            className="navigation__link"
            activeClassName="active"
          >
            Фильмы
        </NavLink>
        </li>
        <li className="navigation__item">
          <NavLink
            to="/saved-movies"
            className="navigation__link"
            activeClassName="active"
          >
            Сохранённые фильмы
          </NavLink>
        </li>

      </ul>
      <NavLink
        to="/profile"
        className="navigation__link navigation__link_type_profile"
        activeClassName="active"
      >
        Аккаунт
      </NavLink>
    </>
  )
};

export default LoggedUserNavigation;
