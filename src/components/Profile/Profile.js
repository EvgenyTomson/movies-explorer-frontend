import { useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState({name: 'Виталий', email: 'user@mail.ru'});

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUser({...user, [name]: value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile edit form submitted');
  }

  const handleLogout = () => {
    console.log('Logout complete');
  }

  return (
    <div className="profile container">
      <h2 className="profile__title">
        {`Привет, ${user.name}!`}
      </h2>

      <form
          name="profile__form"
          className="profile__form"
          onSubmit={handleSubmit}>
          <label className="profile__input-container">
            <span className="profile__input-label">
              Имя
            </span>
            <input
              type="text"
              name="name"
              className="profile__input"
              placeholder="Имя"
              value={user.name || ''}
              onChange={handleChange}
              minLength={2}
              maxLength={30}
              />
          </label>
          <div className="profile__line"/>
          <label className="profile__input-container">
            <span className="profile__input-label">
              E-mail
            </span>
            <input
              type="email"
              name="email"
              className="profile__input"
              placeholder="Имя"
              value={user.email || ''}
              onChange={handleChange}
              />
          </label>
        </form>
        <div className="profile__buttons">
          <button
            type="submit"
            form="profile__form"
            className="profile__button-submit"
          >
            Редактировать
          </button>
          <button
            className="profile__button-logout"
            onClick={handleLogout}
          >
            Выйти из аккаунта
          </button>
        </div>


    </div>
  )
};

export default Profile;
