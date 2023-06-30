import { useLocation } from 'react-router-dom';
import { convertDuration } from '../../utils/utils';
import MovieCardButton from './MovieCardButton/MovieCardButton';
import './MoviesCard.css';
import { moviesImgsBaseUrl } from '../../constants/constants';

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
      <a
        className="movie-card__trailer"
        href={movieData.trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="movie-card__image"
          src={`${moviesImgsBaseUrl}${movieData.image.url}`}
          alt={movieData.nameRU}
        />
      </a>

      <MovieCardButton
        onClickHandler={pathname === "/movies" ? saveMovieHandler : deleteMovieHandler}
        typeClass={''}
      >
        {pathname === "/movies" ? 'Сохранить' : 'x'}
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
