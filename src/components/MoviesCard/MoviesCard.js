import { convertDuration } from '../../utils/utils';
import './MoviesCard.css';

const MoviesCard = ({ movieData }) => {

  return (
    <li className="movie-card">
      <img
        className="movie-card__image"
        src={movieData.image}
        alt={movieData.nameRU}
      />
      <button
        className="movie-card__save"
        type="button"
      >
        Сохранить
      </button>
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
