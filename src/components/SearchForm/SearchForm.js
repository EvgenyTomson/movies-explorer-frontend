import { useEffect, useState } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css'

const SearchForm = ({ searchParams, handleSubmit, setSearchParams, isRequired = true }) => {
  const [searchValue, setSearchValue] = useState(searchParams.querry);
  const [isShortsChecked, setIsShortsChecked] = useState(searchParams.includeShorts);

  const handleChange = ({ target }) => {
    setSearchValue(target.value);
  }

  const handleShortsCheck = () => {
    setIsShortsChecked(!isShortsChecked);
    setSearchParams({...searchParams, includeShorts: !searchParams.includeShorts});
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
            placeholder="Фильм"
            onChange={handleChange}
            value={searchValue}
            required={isRequired}
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
