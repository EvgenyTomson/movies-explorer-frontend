import SectionTitle from '../SectionTitle/SectionTitle';
import TechCard from './TechCard/TechCard';
import './Techs.css'

const techsList = ['HTML', 'CSS', 'JS', 'React', 'Git', 'Express.js', 'mongoDB'];

const Techs = () => {
  return (
    <section className="tech">
      <div className="tech__wrapper container">
        <SectionTitle>
          Технологии
        </SectionTitle>
        <h3 className="tech__title">
          7 технологий
        </h3>
        <p className="tech__text">
          На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
        </p>
        <div className="tech__cards">
          {techsList.map((tech, ind) => <TechCard key={ind} >{tech}</TechCard>)}
        </div>
      </div>
    </section>
  )
};

export default Techs;
