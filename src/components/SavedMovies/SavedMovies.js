import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';
// мок-данные сохраненных фильмов для верстки
import { savedMoviesData } from '../../constants/savedMoviesData';
import { useEffect, useState } from 'react';
import Preloader from '../Preloader/Preloader';
import { apiRequestEmulation } from '../../utils/utils';

const SavedMovies = () => {
  const [isLoadind, setIsLoading] = useState(false);

  // Эмилируем загрузку фильмов
  useEffect(() => {
    setIsLoading(true);
    apiRequestEmulation()
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, [])

  return (
    <section className="saved-movies container">
      <SearchForm />
      {isLoadind
        ? <Preloader />
        : <MoviesCardList moviesData={savedMoviesData}/>
      }
      {/* <MoviesCardList moviesData={savedMoviesData}/> */}
    </section>
  )
};

export default SavedMovies;
