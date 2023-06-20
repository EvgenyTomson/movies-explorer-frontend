import AboutProject from './AboutProject/AboutProject';
import './Main.css';
import NavTab from './NavTab/NavTab';
import Promo from './Promo/Promo';

const Main = (props) => {
  return (
    <section className="main">
      <Promo />
      <NavTab />
      <AboutProject />

    </section>
  )
};

export default Main;
