import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css'

const MoviesCardList = ({ moviesData }) => {
  return (
    <ul className="movies-list">
      {
        moviesData.map(({ _id, ...movie}) => (
          <MoviesCard key={_id} movieData={movie} />
        ))
      }
    </ul>
  )
};

export default MoviesCardList;
