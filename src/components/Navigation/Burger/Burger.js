import './Burger.css';

const Burger = (props) => {
  return (
    <svg className="burger" width="40" height="43" viewBox="0 0 40 43" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M31 15L9 15V12.5L31 12.5V15Z" fill="white"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M31 24L9 24V21.5L31 21.5V24Z" fill="white"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M31 33L9 33V30.5L31 30.5V33Z" fill="white"/>
    </svg>
  )
};

export default Burger;
