import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';
// мок-данные сохраненных фильмов для верстки
// import { savedMoviesData } from '../../constants/savedMoviesData';
import { useEffect, useState } from 'react';
import Preloader from '../Preloader/Preloader';
import { mainApi } from '../../utils/MainApi';
import { movieFilter } from '../../utils/utils';

const SavedMovies = () => {
  const [isLoadind, setIsLoading] = useState(false);

  const [savedMovies, setSavedMovies] = useState([]);

  const [searchedSavedMovies, setSearchedSavedMovies] = useState([]);

  const [searchParams, setSearchParams] = useState({querry: '', includeShorts: false});

  // Эмилируем загрузку фильмов
  useEffect(() => {
    setIsLoading(true);
    mainApi.getSavedMovies()
      .then(res => {
        console.log(res);
        setSavedMovies(res);
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, [])

  const handleSearchSubmit = (evt) => {
    evt.preventDefault();
    const {querry, shorts} = evt.target.elements;
    console.log(querry.value, shorts.checked);

    const currentSearch = {querry: querry.value, includeShorts: shorts.checked};

    // localStorage.setItem('search', JSON.stringify(currentSearch));
    setSearchParams(currentSearch);
  }

  useEffect(() => {
    // if (!searchParams.querry) {
    //   setSearchedSavedMovies(savedMovies);
    //   return;
    // }

    const currentSearchedMovies = savedMovies.filter(movie => movieFilter(movie, searchParams));
    console.log('currentSearchedMovies: ', currentSearchedMovies);
    setSearchedSavedMovies(currentSearchedMovies);
  }, [searchParams, savedMovies])

  return (
    <main className="saved-movies container">
      <SearchForm
        searchParams={searchParams}
        handleSubmit={handleSearchSubmit}

        setSearchParams={setSearchParams}
      />
      {isLoadind
        ? <Preloader />
        : <MoviesCardList moviesData={searchedSavedMovies}/>
      }
      {/* <MoviesCardList moviesData={savedMoviesData}/> */}
    </main>
  )
};

export default SavedMovies;
