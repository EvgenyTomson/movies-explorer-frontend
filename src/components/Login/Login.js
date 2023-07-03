import './Login.css';
import Logo from '../Logo/Logo';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import { Link, useNavigate } from 'react-router-dom';
import { mainApi } from '../../utils/MainApi';
import { useCurrentUserContext } from '../../contexts/CurrentUserContextProvider';
import { useState } from 'react';

const Login = ({ onLogin, setLoginStatus }) => {
  const { setCurrentUser} = useCurrentUserContext();

  const { values, handleChange, errors, isValid, resetForm, inputVilidities } = useFormWithValidation();

  const navigate = useNavigate();

  const [apiErrorMessage, setApiErrorMessage] = useState('');

  const defaultRegisterInputClassName = 'auth__input';
  const errorRegisterInputClassName = 'auth__input auth__input_type_error';

  const handleSubmit = (evt) => {
    evt.preventDefault();

    // console.log('signin values: ', values);
    setApiErrorMessage('');

    mainApi.signin(values)
    .then((userData) => {
      console.log('signin userData: ', userData);

      setCurrentUser(userData);

      setLoginStatus(true);

      localStorage.setItem('currentId', userData._id);

      navigate("/movies", {replace: true});
    })
    .catch(err => {
      setApiErrorMessage(err);
      // console.log(err);
    })

    // onLogin();
    resetForm();
  }

  return (
    <main className="auth container">
      <Logo />
      <h1 className="auth__title">Рады видеть!</h1>
      <form action="#" className="auth__form" name="login" noValidate onSubmit={handleSubmit} >
        <label htmlFor="email" className="auth__field">
          E-mail
          <input
            type="email"
            className={
              inputVilidities.email === undefined || inputVilidities.email
              ? defaultRegisterInputClassName
              : errorRegisterInputClassName
            }
            name="email"
            required
            id="email"
            autoComplete="off"
            placeholder="Email"
            minLength="2"
            maxLength="40"
            onChange={handleChange}
            value={values.email || ""}
          />
          <span className="auth__error" >{errors.email}</span>
        </label>
        <label htmlFor="password" className="auth__field">
          Пароль
          <input
            type="password"
            className={
              inputVilidities.password === undefined || inputVilidities.password
              ? defaultRegisterInputClassName
              : errorRegisterInputClassName
            }
            name="password"
            required
            id="password"
            autoComplete="off"
            placeholder="Пароль"
            minLength="2"
            maxLength="200"
            onChange={handleChange}
            value={values.password || ""}
          />
          <span className="auth__error" >{errors.password}</span>
        </label>

        <span className="auth__api-error">
          {apiErrorMessage}
        </span>

        <button
          className={isValid ? "auth__submit": "auth__submit auth__submit_disabled"}
          type="submit"
          disabled={!isValid}
        >
          Войти
        </button>
        <p className="auth__text">
          Ещё не зарегистрированы? <Link to="/signup" className="auth__link">Регистрация</Link>
        </p>
      </form>
    </main>
  )
};

export default Login;
