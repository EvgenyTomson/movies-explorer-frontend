import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';
import { useEffect, useState } from 'react';
import Preloader from '../Preloader/Preloader';
import { moviesApi } from '../../utils/MoviesApi';
import { getCardsAmount, movieFilter } from '../../utils/utils';
import { useDebouncedFunction } from '../../hooks/useDebouncedFunction';
import { useSavedMoviesContext } from '../../contexts/SavedMoviesContextProvider';
import { mainApi } from '../../utils/MainApi';


const Movies = () => {
  const [isLoadind, setIsLoading] = useState(false);
  const [allMovies, setAllMovies] = useState([]);
  const [displayedMovies, setDisplayedMovies] = useState([]);
  const [cardsAmount, setCardsAmount] = useState(getCardsAmount());
  const [isMoveButtonVisible, setIsMoveButtonVisible] = useState(true);
  const [searchParams, setSearchParams] = useState({querry: '', includeShorts: false});
  const [serachedMovies, setSearchedMovies] = useState([]);

  const { setSavedMovies } = useSavedMoviesContext();

  useEffect(() => {
    setIsLoading(true);
    mainApi.getSavedMovies()
      .then(res => {
        setSavedMovies(res);
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, [setSavedMovies])

  const handleResize = () => {
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
    if (storageMovies) {
      setAllMovies(storageMovies);
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
    console.log(querry.value, shorts.checked);
    if (!querry.value) {
      console.log('Нужно ввести ключевое слово');
      return;
    }

    const currentSearch = {querry: querry.value, includeShorts: shorts.checked};

    localStorage.setItem('search', JSON.stringify(currentSearch));
    setSearchParams(currentSearch);
  }

  useEffect(() => {
    if (!searchParams.querry) return;

    const currentSearchedMovies = allMovies.filter(movie => movieFilter(movie, searchParams));
    setSearchedMovies(currentSearchedMovies);
  }, [searchParams, allMovies])

  return (
    <main className="movies container">
      <SearchForm
        searchParams={searchParams}
        handleSubmit={handleSearchSubmit}

        setSearchParams={setSearchParams}
      />

      {isLoadind
        ? <Preloader />
        : <MoviesCardList moviesData={displayedMovies} />
      }

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
