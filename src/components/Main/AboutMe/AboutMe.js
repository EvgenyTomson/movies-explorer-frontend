import SectionTitle from '../SectionTitle/SectionTitle';
import './AboutMe.css';
import studentPhoto from '../../../images/student-photo.jpg';

const AboutMe = () => {
  return (
    <section className="about-me container" id="student">
      <SectionTitle>Студент</SectionTitle>
      <div className="about-me__info">
        <div className="about-me__bio">
          <h3 className="about-me__name">Евгений</h3>
          <p className="about-me__short">
            Фронтенд-разработчик.
          </p>
          <p className="about-me__description">
            Я живу в Подмосковном городе Сергиев Посад. Окончил "Мытищинский филиал МГТУ им.&nbsp;Н.&nbsp;Э.&nbsp;Баумана"
            по специальности "Вычислительные машины, комплексы, системы и сети".
            Женат и воспитываю двоих сыновей. Я люблю слушать музыку, читать и совершать пешие прогулки.
            В настоящий момент нахожусь в процессе смены профессии и не работаю на постоянной основе.
          </p>
          <a
            href="https://github.com/EvgenyTomson"
            className="about-me__github"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
        <div className="about-me__photo-wrapper">
          <img
            className="about-me__photo"
            src={studentPhoto}
            alt="Фотограция студента"
          />
        </div>
      </div>
    </section>
  )
};

export default AboutMe;
