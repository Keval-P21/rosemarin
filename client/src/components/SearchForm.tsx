import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { options } from '../data';
import { getRandomRecipe } from '../Utils/apiService';

const SearchForm = ({ setRecipes }) => {
  const navigate = useNavigate();

  function searchHandler(event) {
    event.preventDefault();
    setRecipes(getRandomRecipe(event.target.search.value));
    navigate('/home');
  }

  return (
    <div className='form-control'>
      <div className='input-group'>
        <form
          className='w-full m-8 flex justify-center items-center'
          onSubmit={searchHandler}
        >
          <h3 className='font-rufina-bold text-2xl mr-8 subpixel-antialiased'>
            Let's find something special
          </h3>
          <select
            className='select select-bordered w-1/3'
            placeholder='Search by category'
            name='search'
          >
            {options
              .filter((option) => option.type === 'cuisine')
              .map((option) => (
                <option value={option.name} key={option.id}>
                  {option.display_name}
                </option>
              ))}
          </select>
          <button type='submit' className='btn btn-neutral'>
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchForm;
