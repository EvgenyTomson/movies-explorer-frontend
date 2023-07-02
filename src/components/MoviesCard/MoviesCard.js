import { useLocation } from 'react-router-dom';
import { convertDuration } from '../../utils/utils';
import MovieCardButton from './MovieCardButton/MovieCardButton';
import './MoviesCard.css';
import { moviesImgsBaseUrl } from '../../constants/constants';
import { mainApi } from '../../utils/MainApi';
import { useSavedMoviesContext } from '../../contexts/SavedMoviesContextProvider';
import { useEffect, useState } from 'react';

const MoviesCard = ({ movieData, deleteMovieHandler }) => {
  const { savedMovies, setSavedMovies } = useSavedMoviesContext();

  const { pathname } = useLocation();

  const [isMovieSaved, setIsMovieSaved] = useState(false);

  useEffect(() => {
    setIsMovieSaved(savedMovies.some(movie => movie.movieId === movieData.id || movie.movieId === movieData.movieId));
  }, [savedMovies, movieData])

  const saveMovieHandler = () => {
    const savingMovieData = {
      ...movieData,
      movieId: movieData.id,
      image: `${moviesImgsBaseUrl}${movieData.image.url}`,
      thumbnail: `${moviesImgsBaseUrl}${movieData.image.formats.thumbnail.url}`,
    };

    delete savingMovieData.id;
    delete savingMovieData.created_at;
    delete savingMovieData.updated_at;

    // console.log('Movie data: ', movieData);
    // console.log('Movie saved: ', savingMovieData);

    mainApi.saveMovie(savingMovieData)
      .then(movie => {
        console.log('movie: ', movie, 'savedMovies: ', savedMovies);

        setSavedMovies([...savedMovies, movie]);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const onDeleteMovie = () => {
    const deleteParam = pathname === '/movies'
      ? { param: 'id', value: movieData.id }
      : { param: 'movieId', value: movieData.movieId };
      // ? movieData.id
      // : movieData.movieId;

    console.log('Movie deleted: ', deleteParam);

    deleteMovieHandler(deleteParam);
  }

  return (
    <li className="movie-card">
      <a
        className="movie-card__trailer"
        href={movieData.trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="movie-card__image"
          src={
            pathname === "/movies"
              ? `${moviesImgsBaseUrl}/${movieData.image.url}`
              : movieData.image
          }
          alt={movieData.nameRU}
        />
      </a>

      <MovieCardButton
        // onClickHandler={pathname === "/movies" ? saveMovieHandler : onDeleteMovie}
        onClickHandler={isMovieSaved ? onDeleteMovie : saveMovieHandler}
        // typeClass={''}
        typeClass={isMovieSaved && pathname === "/movies"}
      >
        {pathname === "/movies" ? 'Сохранить' : 'X'}
      </MovieCardButton>
      <div className="movie-card__description">
        <h2 className="movie-card__name">
          {movieData.nameRU}
        </h2>
        <span className="movie-card__duration">
          {convertDuration(+movieData.duration)}
        </span>
      </div>
    </li>
  )
};

export default MoviesCard;
