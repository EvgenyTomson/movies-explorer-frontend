import { Link } from 'react-router-dom';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import './Register.css';
import Logo from '../Logo/Logo';

const Register = ({ onRegister }) => {
  const { values, handleChange, errors, isValid, resetForm, inputVilidities } = useFormWithValidation();

  const defaultRegisterInputClassName = 'register__input';
  const errorRegisterInputClassName = 'register__input register__input_type_error';

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onRegister();
    resetForm();
  }

  return (
    <main className="register container">
      <Logo />
      <h1 className="register__title">Добро пожаловать!</h1>
      <form action="#" className="register__form" name="register" noValidate onSubmit={handleSubmit} >
        <label htmlFor="name" className="register__field">
          Имя
          <input
            type="text"
            className={
              inputVilidities.name === undefined || inputVilidities.name
              ? defaultRegisterInputClassName
              : errorRegisterInputClassName
            }
            name="name"
            required
            id="name"
            autoComplete="off"
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            onChange={handleChange}
            value={values.name || ""}
          />
          <span className="register__error" >{errors.name}</span>
        </label>
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
            id="email"
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
            id="password"
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
          className={isValid ? "register__submit": "register__submit register__submit_disabled"}
          type="submit"
          disabled={!isValid}
        >
          Зарегистрироваться
        </button>
        <p className="register__text">
          Уже зарегистрированы? <Link to="/signin" className="register__link">Войти</Link>
        </p>
      </form>
    </main>
  )
};

export default Register;
