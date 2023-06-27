import './Burger.css';

const Burger = ({ onClick }) => {
  return (
    <button
      className="burger__button"
      onClick={onClick}
    >
      <svg className="burger__svg" width="40" height="43" viewBox="0 0 40 43" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M31 15L9 15V12.5L31 12.5V15Z" fill="white"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M31 24L9 24V21.5L31 21.5V24Z" fill="white"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M31 33L9 33V30.5L31 30.5V33Z" fill="white"/>
      </svg>
    </button>
  )
};

export default Burger;
