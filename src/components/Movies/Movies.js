import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';
// мок-данные фильмов для верстки
// import { moviesData } from '../../constants/listData';
import { useEffect, useState } from 'react';
// import { apiRequestEmulation } from '../../utils/utils';
import Preloader from '../Preloader/Preloader';
import { moviesApi } from '../../utils/MoviesApi';
import { getCardsAmount } from '../../utils/utils';
import { useDebouncedFunction } from '../../hooks/useDebouncedFunction';
// import { useCalculateCardsNumber } from '../../hooks/useCalculateCardsNumber';

const Movies = () => {
  const [isLoadind, setIsLoading] = useState(false);
  const [allMovies, setAllMovies] = useState([]);
  const [displayedMovies, setDisplayedMovies] = useState([]);
  const [cardsAmount, setCardsAmount] = useState(getCardsAmount());
  const [isMoveButtonVisible, setIsMoveButtonVisible] = useState(true);

  const handleResize = () => {
    // console.log('resize', cardsAmount);
    setCardsAmount(getCardsAmount());
  }

  const debouncedResize = useDebouncedFunction(handleResize, 400);

  useEffect(() => {
    window.addEventListener('resize', debouncedResize);

    return () => window.removeEventListener('resize', debouncedResize);
  }, [debouncedResize]);


  useEffect(() => {
    const storageMovies = JSON.parse(localStorage.getItem('movies'));
    // console.log(storageMovies);
    if (storageMovies) {
      setAllMovies(storageMovies.slice(0, 19)); // не забыть убрать слайс, он нужен для тестов!!!
      return;
    }

    setIsLoading(true);
    moviesApi.getAllMovies()
      .then(movies => {
        setAllMovies(movies);
        localStorage.setItem('movies', JSON.stringify(movies));
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, [])

  useEffect(() => {
    setDisplayedMovies(allMovies.slice(0, cardsAmount.totalCards));
  }, [cardsAmount, allMovies])

  const handleMoreMovies = () => {
    const moviesToShow = allMovies.slice(displayedMovies.length, displayedMovies.length + cardsAmount.extraCards);
    // console.log('moviesToShow = ', moviesToShow);

    setDisplayedMovies([...displayedMovies, ...moviesToShow]);
  }

  useEffect(() => {
    setIsMoveButtonVisible(displayedMovies.length < allMovies.length);
  }, [displayedMovies, allMovies])

  return (
    <main className="movies container">
      <SearchForm />
      {isLoadind
        ? <Preloader />
        // : <MoviesCardList moviesData={allMovies.slice(0, cardsAmount.totalCards)}/>
        : <MoviesCardList moviesData={displayedMovies}/>
      }
      {/* <MoviesCardList moviesData={moviesData}/> */}

      {
        isMoveButtonVisible
          ? <button
              className="movies__more"
              type="button"
              onClick={handleMoreMovies}
            >
              Ещё
            </button>
          : null
      }

      {/* <button
        className="movies__more"
        type="button"
        onClick={handleMoreMovies}
      >
        Ещё
      </button> */}

    </main>
  )
};

export default Movies;
