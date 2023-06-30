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

  const handleSearchSubmit = (evt) => {
    evt.preventDefault();
    console.log('Шортс: ', isShortsChecked, 'Запрос: ', searchValue);

    localStorage.setItem('search', JSON.stringify({querry: searchValue, withShorts: isShortsChecked}));
  }

  return (
    <section className="search">
      <form
        className="search__form"
        onSubmit={handleSearchSubmit}
      >
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
