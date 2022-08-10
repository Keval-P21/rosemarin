import * as React from 'react';
import { useEffect } from 'react';
import TopSection from './TopSection';
import SearchForm from './SearchForm';
import Recipe from './Recipe';
import { getMyRecipes } from '../Utils/apiDBService';

const MyRecipesList = ({
  myRecipes,
  setMyRecipes,
  setIds,
  ids,
  setRecipes,
  isAuthenticated,
  setErrorMessage,
}) => {
  useEffect(() => {
    getMyRecipes()
      .then((recipes) => setMyRecipes(recipes))
      .catch((err) => {
        setErrorMessage('Error getting your recipe list');
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids]);

  return (
    <div className="mb-20">
      <TopSection />
      <div className="prose lg:prose-xl  m-auto mb-10 text-center">
        <h2 className="m-auto font-rufina-bold ">List of favourite recipes</h2>
      </div>
      <SearchForm setRecipes={setRecipes}></SearchForm>

      <ul
        id="myRecipeList"
        className="bg-transparent container-grid max-w-7xl mx-auto pr-5 pl-5"
      >
        {myRecipes.map((recipe, i) =>
          i === 4 ? (
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
          ) : i === 6 ? (
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
          ) : i > 9 ? null : (
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
    </div>
  );
};

export default MyRecipesList;
