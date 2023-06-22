import { useNavigate } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section className="error container">
      <h2 className="error_title">
        404
      </h2>
      <p className="error__text">
        Страница не найдена
      </p>
      <button onClick={() => navigate(-1)} className="error__back">
        Назад
      </button>
    </section>
  )
};

export default NotFound;
