import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';
import { useEffect, useState } from 'react';
import Preloader from '../Preloader/Preloader';
import { moviesApi } from '../../utils/MoviesApi';
import { getCardsAmount, movieFilter } from '../../utils/utils';
import { useDebouncedFunction } from '../../hooks/useDebouncedFunction';


const Movies = () => {
  const [isLoadind, setIsLoading] = useState(false);
  const [allMovies, setAllMovies] = useState([]);
  const [displayedMovies, setDisplayedMovies] = useState([]);
  const [cardsAmount, setCardsAmount] = useState(getCardsAmount());
  const [isMoveButtonVisible, setIsMoveButtonVisible] = useState(true);

  const [searchParams, setSearchParams] = useState({querry: '', includeShorts: false});
  const [serachedMovies, setSearchedMovies] = useState([]);

  const handleResize = () => {
    // console.log('resize', cardsAmount);
    setCardsAmount(getCardsAmount());
  }

  const debouncedResize = useDebouncedFunction(handleResize);

  useEffect(() => {
    window.addEventListener('resize', debouncedResize);

    return () => window.removeEventListener('resize', debouncedResize);
  }, [debouncedResize]);


  useEffect(() => {
    const search = JSON.parse(localStorage.getItem('search'));
    if (search) setSearchParams(search);

    const storageMovies = JSON.parse(localStorage.getItem('movies'));
    // console.log(storageMovies);
    if (storageMovies) {
      setAllMovies(storageMovies);
      //(storageMovies.slice(0, 40)); // не забыть убрать слайс, он нужен для тестов!!!
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
    setDisplayedMovies(serachedMovies.slice(0, cardsAmount.totalCards));
  }, [cardsAmount, serachedMovies])

  const handleMoreMovies = () => {
    const moviesToShow = serachedMovies.slice(displayedMovies.length, displayedMovies.length + cardsAmount.extraCards);

    setDisplayedMovies([...displayedMovies, ...moviesToShow]);
  }

  useEffect(() => {
    setIsMoveButtonVisible(displayedMovies.length < serachedMovies.length);
  }, [displayedMovies, serachedMovies])

  const handleSearchSubmit = (evt) => {
    evt.preventDefault();
    const {querry, shorts} = evt.target.elements;
    // console.log(querry.value, shorts.checked);

    const currentSearch = {querry: querry.value, includeShorts: shorts.checked};

    localStorage.setItem('search', JSON.stringify(currentSearch));
    setSearchParams(currentSearch);
  }

  useEffect(() => {
    if (!searchParams.querry) return;

    const currentSearchedMovies = allMovies.filter(movie => movieFilter(movie, searchParams));
    // console.log('currentSearchedMovies: ', currentSearchedMovies);
    setSearchedMovies(currentSearchedMovies);
  }, [searchParams, allMovies])

  return (
    <main className="movies container">
      <SearchForm
        searchParams={searchParams}
        handleSubmit={handleSearchSubmit}
      />
      {isLoadind
        ? <Preloader />
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

    </main>
  )
};

export default Movies;
