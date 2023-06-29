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
    <section className="search">
      <form className="search__form">
        <fieldset className="search__request">
          <input
            className="search__input"
            type="text"
            required
            placeholder="Фильм"
            onChange={handleChange}
            value={searchValue}
          />
          <button
            className="search__submit"
            type="submit"
          />
        </fieldset>
        <FilterCheckbox
          checkHandler={handleShortsCheck}
          isChecked={isShortsChecked}
        />
      </form>
    </section>
  )
};

export default SearchForm;
