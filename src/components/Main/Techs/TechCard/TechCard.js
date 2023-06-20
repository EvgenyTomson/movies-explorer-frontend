import './TechCard.css';

const TechCard = ( {children} ) => {
  return (
    <span className="tech__card">
      {children}
    </span>
  )
};

export default TechCard;
