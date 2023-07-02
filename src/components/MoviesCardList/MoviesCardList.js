import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css'
import { mainApi } from '../../utils/MainApi';
import { useSavedMoviesContext } from '../../contexts/SavedMoviesContextProvider';

const MoviesCardList = ({ moviesData }) => {

  const { savedMovies, setSavedMovies } = useSavedMoviesContext();

  const { pathname } = useLocation();

  const deleteMovieHandler = ({ param, value }) => {

    const movieToDelete = savedMovies.find(movie => movie.movieId === value);

    // console.log('deleteMovieHandler movie: ', movieToDelete);

    mainApi.deleteMovie(movieToDelete._id)
      .then(deletedMovieData => {
        console.log('deletedMovieData: ', deletedMovieData);
        // setMoviesData(moviesData.filter(movie => movie[param] !== value));
        setSavedMovies(savedMovies.filter(movie => movie.movieId !== value));
      })
      .catch(err => {
        console.error(err);
      })
  }

  return (
    <section className="movies-section">
      <ul className="movies-list">
        {
          moviesData.map((movie) => (
            <MoviesCard
              deleteMovieHandler={deleteMovieHandler}
              key={
                pathname === "/movies"
                  ? movie.id
                  : movie._id
              }
              movieData={movie}
            />
          ))
        }
      </ul>
    </section>
  )
};

export default MoviesCardList;
