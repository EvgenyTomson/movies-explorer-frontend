import { useState } from 'react';
import './Profile.css';
import { useCurrentUserContext } from '../../contexts/CurrentUserContextProvider';
import { useNavigate } from 'react-router-dom';
import { mainApi } from '../../utils/MainApi';

const Profile = ({ onLogout, setLoginStatus }) => {
  const {currentUser, setCurrentUser} = useCurrentUserContext();

  // const [user, setUser] = useState({name: 'Виталий', email: 'user@mail.ru'});

  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);

  const handleMakeEditable = () => {
    setIsEditing(true);
  }

  const handleChange = ({ target }) => {
    const { name, value } = target;
    // setUser({...user, [name]: value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile edit form submitted');
    setIsEditing(false);
  }

  const handleLogout = () => {

    mainApi.logoutUser()
    .then(() => {
      console.log('logout success');

      setCurrentUser(null);
      setLoginStatus(false);
      navigate("/", {replace: true});
    })

    // onLogout();
  }

  return (
    <main className="profile container">
      <h1 className="profile__title">
        {`Привет, ${currentUser.name}!`}
      </h1>

      <form
        name="profile__form"
        className="profile__form"
        onSubmit={handleSubmit}>
        <label className="profile__input-container">
          <span className="profile__input-label">
            Имя
          </span>
          <input
            disabled={!isEditing}
            required
            type="text"
            name="name"
            className="profile__input"
            placeholder="Укажите имя"
            value={currentUser.name || ''}
            onChange={handleChange}
            minLength={2}
            maxLength={30}
          />
        </label>
        <label className="profile__input-container">
          <span className="profile__input-label">
            E-mail
          </span>
          <input
            disabled={!isEditing}
            required
            type="email"
            name="email"
            className="profile__input"
            placeholder="Укажите почту"
            value={currentUser.email || ''}
            onChange={handleChange}
          />
        </label>
        {
          isEditing
            ? <button
                type="submit"
                className="profile__submit"
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
