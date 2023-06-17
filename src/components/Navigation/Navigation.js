import './Navigation.css';
import { NavLink } from "react-router-dom";

const Navigation = ({ isLoggedIn }) => {
  return (
    <nav className="navigation">
      <ul className="navigation__list">
        <li className="navigation__item">
          <NavLink to="/" className="navigation__link navigation__link_type_home">Гравная</NavLink>
        </li>
        <li className="navigation__item">
          <NavLink to="/movies" className="navigation__link">Фильмы</NavLink>
        </li>
        <li className="navigation__item">
          <NavLink to="/saved-movies" className="navigation__link navigation__link_type_saved-movies">Сохранённые фильмы</NavLink>
        </li>
      </ul>
      <NavLink to="/profile" className="navigation__link navigation__link_type_profile">Аккаунт</NavLink>
    </nav>
  )
};

export default Navigation;
