import { NavLink } from 'react-router-dom';
import './LoginRegisterMenu.css';

const LoginRegisterMenu = () => {
  return (
    <ul className="login-register-menu">
      <li className="login-register-menu__item">
        <NavLink
          to="/signup"
          className="login-register-menu__link"
        >
          Регистрация
        </NavLink>
      </li>
      <li className="login-register-menu__item">
        <NavLink
          to="/signin"
          className="login-register-menu__link login-register-menu__link_type_login"
        >
          Войти
        </NavLink>
      </li>
    </ul>
  )
};

export default LoginRegisterMenu;
