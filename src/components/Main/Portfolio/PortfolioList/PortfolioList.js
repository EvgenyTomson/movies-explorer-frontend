import PortfolioItem from '../PortfolioItem/PortfolioItem';
import './PortfolioList.css';

const projects = [
  {
    title: 'Статичный сайт',
    link: 'https://github.com/EvgenyTomson/how-to-learn'
  },
  {
    title: 'Адаптивный сайт',
    link: 'https://evgenytomson.github.io/russian-travel/'
  },
  {
    title: 'Одностраничное приложение',
    link: 'https://github.com/EvgenyTomson/react-mesto-api-full-gha'
  },
];

const PortfolioList = () => {
  return (
    <ul className="portfolio__list">
      {
        projects.map((project, index) => (
          <PortfolioItem key={index} progectData={project} />
        ))
      }
    </ul>
  )
};

export default PortfolioList;
