import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';
// мок-данные фильмов для верстки
import { moviesData } from '../../constants/listData';
import { useEffect, useState } from 'react';
import { apiRequestEmulation } from '../../utils/utils';
import Preloader from '../Preloader/Preloader';

const Movies = () => {
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
    <main className="movies container">
      <SearchForm />
      {isLoadind
        ? <Preloader />
        : <MoviesCardList moviesData={moviesData}/>
      }
      {/* <MoviesCardList moviesData={moviesData}/> */}
      <button className="movies__more" type="button">
        Ещё
      </button>
    </main>
  )
};

export default Movies;
