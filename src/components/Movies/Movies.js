import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';
// мок-данные фильмов для верстки
import { moviesData } from '../../constants/listData';

const Movies = () => {
  return (
    <section className="movies container">
      <SearchForm />
      <MoviesCardList moviesData={moviesData}/>
      <button className="movies__more" type="button">
        Ещё
      </button>
    </section>
  )
};

export default Movies;
