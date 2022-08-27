import * as React from 'react';
import { useNavigate } from 'react-router';
import Recipe from './Recipe';
import SearchForm from './SearchForm';
import TopSection from './TopSection';

const RecipesList = ({
  recipes,
  setIds,
  ids,
  setRecipes,
  isAuthenticated,
  setErrorMessage,
}) => {
  const navigate = useNavigate();
  if (!isAuthenticated) navigate('/home');
  return (
    <>
      <TopSection />
      <SearchForm setRecipes={setRecipes}></SearchForm>
      <ul className='bg-transparent container-grid max-w-7xl mx-auto pr-5 pl-5'>
        {recipes.map((recipe, i) =>
          i === 4 || i % 10 === 4 ? (
            <Recipe
              recipe={recipe}
              key={recipe.id}
              className={
                'horizontal span-col-4 card bg-base-100 shadow-xl flex-row'
              }
              setIds={setIds}
              ids={ids}
              isAuthenticated={isAuthenticated}
              setErrorMessage={setErrorMessage}
            ></Recipe>
          ) : i === 6 || i % 10 === 6 ? (
            <Recipe
              recipe={recipe}
              key={recipe.id}
              className={
                'vertical span-col-2 span-row-2 card bg-base-100 shadow-xl'
              }
              setIds={setIds}
              ids={ids}
              isAuthenticated={isAuthenticated}
              setErrorMessage={setErrorMessage}
            ></Recipe>
          ) : (
            <Recipe
              recipe={recipe}
              key={recipe.id}
              className={'vertical card bg-base-100 shadow-xl'}
              setIds={setIds}
              ids={ids}
              isAuthenticated={isAuthenticated}
              setErrorMessage={setErrorMessage}
            ></Recipe>
          )
        )}
      </ul>
    </>
  );
};

export default RecipesList;
