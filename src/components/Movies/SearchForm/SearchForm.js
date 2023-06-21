import { useState } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css'

const SearchForm = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isShortsChecked, setIsShortsChecked] = useState(false);

  const handleChange = ({ target }) => {
    setSearchValue(target.value);
  }

  const handleShortsCheck = () => {
    setIsShortsChecked(!isShortsChecked);
  }

  return (
    <div className="search">
      <form className="search__form">
        <input
          className="seach__input"
          placeholder="Фильм"
          onChange={handleChange}
          value={searchValue}
        />
        <button
          className="seach__submit"
          type="submit"
        />
      </form>
      <FilterCheckbox
        checkHandler={handleShortsCheck}
        isChecked={isShortsChecked}
      />
    </div>
  )
};

export default SearchForm;
