import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css'

const MoviesCardList = ({ moviesData }) => {

  const { pathname } = useLocation();

  return (
    <section className="movies-section">
      <ul className="movies-list">
        {
          moviesData.map((movie) => (
            <MoviesCard
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
