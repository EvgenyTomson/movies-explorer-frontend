import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import Header from '../Header/Header';
import { CurrentUserContextProvider } from '../../contexts/CurrentUserContextProvider';
import { mainApi } from '../../utils/MainApi';
import { SavedMoviesContextProvider } from '../../contexts/SavedMoviesContextProvider';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

const App = () => {
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({name: '', email: ''});
  // const [currentUser, setCurrentUser] = useState(null);


  const [savedMovies, setSavedMovies] = useState([]);

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

  useEffect(() => {
    const id = localStorage.getItem('currentId');

    // console.log(id);

    if (id) {
      mainApi.reEnter()
        .then((userData) => {
          // onUserLogin(data.email);
          // console.log(userData);
          setCurrentUser(userData);

          setIsLogged(true);

          // navigate(-1);
        })
        .catch((error) => {
          console.error(error);
        })
    }
  }, []);

  // Не нужен
  // useEffect(() => {
  //   if (!currentUser.name) return;
  //   // if (!currentUser) return;
  //   setIsLogged(true);
  // }, [currentUser])

  return (
    <div className="body">
      <CurrentUserContextProvider
        context={{ currentUser, setCurrentUser }}
      >
        <SavedMoviesContextProvider
          context={{ savedMovies, setSavedMovies }}
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
        <Route
          path="/signup"
          element={<Register onRegister={handleRegestration} setLoginStatus={setIsLogged} />}
        />
        <Route
          path="/signin"
          element={<Login onLogin={handleLogin} setLoginStatus={setIsLogged} />}
        />

        <Route
          path="/movies"
          element={
            <ProtectedRoute isLogged={isLogged}>
              <Layout isLogged={isLogged}>
                <Movies />
              </Layout>
            </ProtectedRoute>
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

        </SavedMoviesContextProvider>
      </CurrentUserContextProvider>
    </div>
  );
}

export default App;