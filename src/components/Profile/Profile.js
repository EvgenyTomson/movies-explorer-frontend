import { useEffect, useRef, useState } from 'react';
import './Profile.css';
import { useCurrentUserContext } from '../../contexts/CurrentUserContextProvider';
import { useNavigate } from 'react-router-dom';
import { mainApi } from '../../utils/MainApi';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import { MESSAGE_API_PROFILE_SUCCESS, PATTERN_EMAIL } from '../../constants/constants';

const Profile = ({ setLoginStatus }) => {
  const {currentUser, setCurrentUser} = useCurrentUserContext();
  const [isSameValues, setIsSameValues] = useState(true);
  const [apiMessage, setApiMessage] = useState('');
  const {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
  } = useFormWithValidation();
  const navigate = useNavigate();
  const nameInputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleMakeEditable = () => {
    setIsEditing(true);
    setApiMessage('');
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    mainApi.editUserData(values)
      .then(updatedUserData => {
        setCurrentUser(updatedUserData);
        setApiMessage(MESSAGE_API_PROFILE_SUCCESS);
      })
      .catch(error => {
        setApiMessage(error);
      })
      .finally(() => {
        setIsSameValues(true);
      })

    setIsEditing(false);
  }

  useEffect(() => {
    if (!isEditing) return;
    nameInputRef.current.focus();
  }, [isEditing])

  useEffect(() => {
    if (!currentUser.name) return;
    resetForm(false, { name: currentUser.name, email: currentUser.email });
  }, [currentUser, resetForm])

  const handleLogout = () => {
    mainApi.logoutUser()
    .then(() => {
      setCurrentUser({name: '', email: ''});
      localStorage.removeItem('currentId');
      localStorage.removeItem('search');
      setLoginStatus(false);
      navigate("/", {replace: true});
    })
  }

  useEffect(() => {
    if (currentUser.name === values.name && currentUser.email === values.email) {
      setIsSameValues(true);
    } else {
      setIsSameValues(false);
    }
  }, [currentUser, values])

  return (
    <main className="profile container">
      <h1 className="profile__title">
        {`Привет, ${currentUser.name}!`}
      </h1>
      <form
        name="profile__form"
        className="profile__form"
        onSubmit={handleSubmit}
        noValidate
      >
        <label className="profile__input-container">
          <div className="profile__input-wrapper">
            <span className="profile__input-label">
              Имя
            </span>
            <input
              ref={nameInputRef}
              disabled={!isEditing}
              autoComplete="off"
              required
              type="text"
              name="name"
              className="profile__input"
              placeholder="Укажите имя"
              value={values.name || ''}
              onChange={handleChange}
              minLength={2}
              maxLength={30}
            />
          </div>
          <span className="profile__error" >{errors.name}</span>
        </label>
        <label className="profile__input-container">
          <div className="profile__input-wrapper">
            <span className="profile__input-label">
              E-mail
            </span>
            <input
              disabled={!isEditing}
              autoComplete="off"
              required
              type="email"
              name="email"
              className="profile__input"
              placeholder="Укажите почту"
              value={values.email || ''}
              onChange={handleChange}
              pattern={PATTERN_EMAIL}
            />
          </div>
          <span className="profile__error" >{errors.email}</span>
        </label>

        <span className="profile__api-error">
          {apiMessage}
        </span>

        {
          isEditing
            ? <button
                type="submit"
                className="profile__submit"
                disabled={isSameValues || !isValid}
              >
                Сохранить
              </button>
            : <div className="profile__buttons">
                <button
                  type="button"
                  className="profile__button profile__button_type_edit"
                  onClick={handleMakeEditable}
                >
                  Редактировать
                </button>
                <button
                  type="button"
                  className="profile__button profile__button_type_logout"
                  onClick={handleLogout}
                >
                  Выйти из аккаунта
                </button>
              </div>
        }
      </form>
    </main>
  )
};

export default Profile;
