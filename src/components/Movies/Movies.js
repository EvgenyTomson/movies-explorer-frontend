import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchForm';
import './Movies.css';

const Movies = () => {
  return (
    <section className="movies container">
      <SearchForm />
      <MoviesCardList />
      <button className="movies__more" type="button">
        Ещё
      </button>
    </section>
  )
};

export default Movies;
