import LoginRegisterMenu from './LoginRegisterMenu/LoginRegisterMenu';
import './Navigation.css';
import { NavLink } from "react-router-dom";

const Navigation = ({  isLogged, isBurger = false }) => {

  return (
    <nav className="navigation">
      <ul className="navigation__list">
        { isBurger &&
          <li className="navigation__item">
            <NavLink to="/" className="navigation__link navigation__link_type_home">Гравная</NavLink>
          </li>
        }

        {
          isLogged
          ? <>
              <li className="navigation__item">
                <NavLink to="/movies" className="navigation__link">Фильмы</NavLink>
              </li>
              <li className="navigation__item">
                <NavLink to="/saved-movies" className="navigation__link navigation__link_type_saved-movies">Сохранённые фильмы</NavLink>
              </li>
          </>
          : null
        }
      </ul>

      {
        isLogged
        ? <NavLink to="/profile" className="navigation__link navigation__link_type_profile">Аккаунт</NavLink>
        : <LoginRegisterMenu />
      }

    </nav>
  )
};

export default Navigation;
