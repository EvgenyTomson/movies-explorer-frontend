import AboutProject from './AboutProject/AboutProject';
import './Main.css';
import NavTab from './NavTab/NavTab';
import Promo from './Promo/Promo';
import Techs from './Techs/Techs';

const Main = (props) => {
  return (
    <section className="main">
      <Promo />
      <NavTab />
      <AboutProject />
      <Techs />

    </section>
  )
};

export default Main;
