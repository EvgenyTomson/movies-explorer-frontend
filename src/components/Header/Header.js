import './Header.css';
import Logo from "../Logo/Logo";
import Navigation from '../Navigation/Navigation';

const Header = () => {
  return (
    <header className="header">
      <Logo />
      <Navigation isLoggedIn={true} />
    </header>
  )
};

export default Header;
