import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';
import { useEffect, useState } from 'react';
import Preloader from '../Preloader/Preloader';
import { mainApi } from '../../utils/MainApi';
import { movieFilter } from '../../utils/utils';
import { useSavedMoviesContext } from '../../contexts/SavedMoviesContextProvider';

const SavedMovies = () => {
  const [isLoadind, setIsLoading] = useState(false);
  const { savedMovies, setSavedMovies } = useSavedMoviesContext();
  const [searchedSavedMovies, setSearchedSavedMovies] = useState([]);
  const [searchParams, setSearchParams] = useState({querry: '', includeShorts: false});

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
  }, [setSavedMovies])

  const handleSearchSubmit = (evt) => {
    evt.preventDefault();
    const {querry, shorts} = evt.target.elements;
    const currentSearch = {querry: querry.value, includeShorts: shorts.checked};
    setSearchParams(currentSearch);
  }

  useEffect(() => {
    const currentSearchedMovies = savedMovies.filter(movie => movieFilter(movie, searchParams));
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
        : <MoviesCardList moviesData={searchedSavedMovies} />
      }
    </main>
  )
};

export default SavedMovies;
