import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import { useState } from 'react';
import Layout from '../Layout/Layout';
import Header from '../Header/Header';
import { CurrentUserContextProvider } from '../../contexts/CurrentUserContextProvider';

const App = () => {
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({name: 'Вася', email: 'user@mail.ru'});

  // Временная логика для имитации авторизации:
  const handleRegestration = () => {
    navigate("/signin", {replace: true});
  }

  const handleLogin = () => {
    setIsLogged(true);
    navigate("/", {replace: true});
  }

  const handleLogout = () => {
    setIsLogged(false);
    navigate("/signin", {replace: true});
  }

  return (
    <div className="body">
      <CurrentUserContextProvider
        context={{ currentUser, setCurrentUser }}
      >

      <Routes>
        <Route
          path="/"
          element={
            <Layout isLogged={isLogged}>
              <Main />
            </Layout>
          }
        />
        <Route path="/signup" element={<Register onRegister={handleRegestration} />} />
        <Route path="/signin" element={<Login onLogin={handleLogin} setLoginStatus={setIsLogged} />} />
        <Route
          path="/movies"
          element={
            <Layout isLogged={isLogged}>
              <Movies />
            </Layout>
          }
        />
        <Route
          path="/saved-movies"
          element={
            <Layout isLogged={isLogged}>
              <SavedMovies />
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <Header isLogged={isLogged}/>
              <Profile onLogout={handleLogout} setLoginStatus={setIsLogged} />
            </>
          }
        />
        <Route path="*" element={<Navigate to="/404" replace/>} />
        <Route path="/404" element={<NotFound />} />
      </Routes>

      </CurrentUserContextProvider>
    </div>
  );
}

export default App;