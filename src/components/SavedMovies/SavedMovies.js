import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';
// мок-данные сохраненных фильмов для верстки
import { savedMoviesData } from '../../constants/savedMoviesData';

const SavedMovies = () => {
  return (
    <section className="saved-movies container">
      <SearchForm />
      <MoviesCardList moviesData={savedMoviesData}/>
    </section>
  )
};

export default SavedMovies;
