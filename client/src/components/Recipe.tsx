import * as React from 'react';
import { Link } from 'react-router-dom';
import Heart from './Heart';

const Recipe = ({
  recipe,
  className,
  setIds,
  ids,
  isAuthenticated,
  setErrorMessage,
}) => {
  return (
    <li id='recipeCard' className={className}>
      <figure>
        <img
          src={recipe.thumbnail_url || recipe.img_url || recipe.img_data}
          alt={recipe.name || recipe.title}
        />
      </figure>
      <div className='card-body'>
        <h2 className='card-title font-rufina-bold'>
          {recipe.name || recipe.title}
        </h2>

        <div className='card-actions flex justify-between'>
          {isAuthenticated ? (
            recipe.instructions || recipe.Instructions ? (
              <Heart
                recipe={recipe}
                setIds={setIds}
                isAuthenticated={isAuthenticated}
                ids={ids}
                setErrorMessage={setErrorMessage}
              />
            ) : (
              <div className='text-2xl self-center mr-3'>&#127910;</div>
            )
          ) : (
            <></>
          )}

          <Link
            to={/recipes/ + (recipe.id_tasty || recipe.id)}
            className='btn btn-warning font-rufina-regular'
          >
            Details
          </Link>
        </div>
      </div>
    </li>
  );
};

export default Recipe;
