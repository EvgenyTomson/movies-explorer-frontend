import { useLocation } from 'react-router-dom';
import { convertDuration } from '../../utils/utils';
import MovieCardButton from './MovieCardButton/MovieCardButton';
import './MoviesCard.css';

const MoviesCard = ({ movieData }) => {
  const { pathname } = useLocation();

  const saveMovieHandler = () => {
    console.log('Movie saved');
  }

  const deleteMovieHandler = () => {
    console.log('Movie deleted');
  }

  return (
    <li className="movie-card">
      <img
        className="movie-card__image"
        src={movieData.image}
        alt={movieData.nameRU}
      />
      <MovieCardButton
        onClickHandler={pathname === "/movies" ? saveMovieHandler : deleteMovieHandler}
        typeClass={''}
      >
        {pathname === "/movies" ? 'Сохранить' : 'x'}
      </MovieCardButton>
      <div className="movie-card__description">
        <p className="movie-card__name">
          {movieData.nameRU}
        </p>
        <span className="movie-card__duration">
          {convertDuration(+movieData.duration)}
        </span>
      </div>
    </li>
  )
};

export default MoviesCard;
