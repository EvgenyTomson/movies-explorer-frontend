import './FilterCheckbox.css'

const FilterCheckbox = ({checkHandler, isChecked}) => {
  return (
    <label className="checkbox">
      <input
        type="checkbox"
        className="checkbox_type_real"
        checked={isChecked}
        onChange={checkHandler}
      />
      <span className="checkbox_type_custom" />
      Короткометражки
    </label>
  )
};

export default FilterCheckbox;
