import './Login.css';
import Logo from '../Logo/Logo';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import { Link } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const { values, handleChange, errors, isValid, resetForm, inputVilidities } = useFormWithValidation();

  const defaultRegisterInputClassName = 'register__input';
  const errorRegisterInputClassName = 'register__input register__input_type_error';

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onLogin();
    resetForm();
  }

  return (
    <section className="register container">
      <Logo />
      <h2 className="register__title">Рады видеть!</h2>
      <form action="#" className="register__form" name="login" noValidate onSubmit={handleSubmit} >
        <label htmlFor="email" className="register__field">
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
            autoComplete="off"
            placeholder="Email"
            minLength="2"
            maxLength="40"
            onChange={handleChange}
            value={values.email || ""}
          />
          <span className="register__error" >{errors.email}</span>
        </label>
        <label htmlFor="password" className="register__field">
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
            autoComplete="off"
            placeholder="Пароль"
            minLength="2"
            maxLength="200"
            onChange={handleChange}
            value={values.password || ""}
          />
          <span className="register__error" >{errors.password}</span>
        </label>
        <button
          className={isValid ? "login__submit": "login__submit login__submit_disabled"}
          type="submit"
          disabled={!isValid}
        >
          Войти
        </button>
        <p className="register__text">
          Ещё не зарегистрированы? <Link to="/signup" className="register__link">Регистрация</Link>
        </p>
      </form>
    </section>
  )
};

export default Login;
