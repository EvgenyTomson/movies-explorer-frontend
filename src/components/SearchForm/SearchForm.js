import { useEffect, useState } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css'

const SearchForm = ({ searchParams, handleSubmit }) => {
  const [searchValue, setSearchValue] = useState(searchParams.querry);//useState('');
  const [isShortsChecked, setIsShortsChecked] = useState(searchParams.includeShorts);//useState(false);

  const handleChange = ({ target }) => {
    setSearchValue(target.value);
  }

  const handleShortsCheck = () => {
    setIsShortsChecked(!isShortsChecked);
  }

  useEffect(() => {
    setSearchValue(searchParams.querry);
    setIsShortsChecked(searchParams.includeShorts);
  }, [searchParams])

  return (
    <section className="search">
      <form
        className="search__form"
        onSubmit={handleSubmit}
      >
        <fieldset className="search__request">
          <input
            className="search__input"
            type="text"
            name="querry"
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
