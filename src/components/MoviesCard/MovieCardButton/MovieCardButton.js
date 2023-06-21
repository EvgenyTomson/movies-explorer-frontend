import './MovieCardButton.css';

const MovieCardButton = ({ onClickHandler, typeClass, children }) => {
  return (
    <button
      className={`movie-card__button ${typeClass}`}
      type="button"
      onClick={onClickHandler}
    >
      {children}
    </button>
  )
};

export default MovieCardButton;
