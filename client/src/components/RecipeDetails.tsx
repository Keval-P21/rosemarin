import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Ingredient,
  Instruction,
  MyRecipe,
  Recipe,
  Rendition,
  Section,
} from '../Types';
import { deleteRecipe } from '../Utils/apiDBService';
import { postItem } from '../Utils/apiDBServiceShoppingList';

const RecipeDetails = ({
  recipes,
  myRecipes,
  setItems,
  isAuthenticated,
  setErrorMessage,
}) => {
  const navigate = useNavigate();
  if (!isAuthenticated) navigate('/home');
  const [recipe, setRecipe] = useState({
    name: '',
    thumbnail_url: '',
    description: '',
    sections: [] as Section[],
    instructions: [] as Instruction[],
    renditions: [] as Rendition[],
  } as Recipe);
  const [myRecipe, setMyRecipe] = useState({
    title: '',
    description: '',
    ingredients: [] as Ingredient[],
    instructions: [] as Instruction[],
  } as MyRecipe);

  const [confirm, setConfirm] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const result = recipes.find((res) => +id! === res.id);
    setRecipe(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipes]);

  useEffect(() => {
    const result = myRecipes.find((res) => +id! === res.id);
    setMyRecipe(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myRecipes]);

  const addHandlerShoppingList = (data) => {
    const newItem = {
      name: data.name,
      quantity: data.quantity,
      unit: data.unit,
    };
    postItem(newItem)
      .then((res) => setItems((prev) => [...prev, res]))
      .catch((error) => {
        setErrorMessage('Error adding item to shopping list');
        console.log(error);
      });
  };

  const confirmDelete = () => {
    setConfirm(true);
  };

  const cancelDelete = () => {
    setConfirm(false);
  };

  const deleteHandlerRecipe = (id) => {
    deleteRecipe(id);
    navigate('/home');
  };

  return recipe || myRecipe ? (
    <>
      <div className='h-[300px] flex justify-between items-center'>
        <div
          className='bg-top-img3 w-full h-full bg-no-repeat bg-center bg-cover'
          id='image-header-banner'
        ></div>
      </div>
      <div className='bg-base-100 shadow-xl max-w-screen-xl m-auto my-20 prose lg:prose-xl'>
        <h2
          className='card-title font-rufina-bold block text-center'
          id='recipe-title'
        >
          {recipe ? recipe.name : myRecipe.title}
        </h2>
        <div className='flex'>
          <figure className='max-w-lg ml-10'>
            <img
              src={
                recipe
                  ? recipe.thumbnail_url!
                  : myRecipe.img_url
                  ? myRecipe.img_url!
                  : myRecipe.img_data
                  ? myRecipe.img_data!
                  : 'Image'
              }
              alt={recipe ? recipe.name : myRecipe.title}
            />
          </figure>
          <div>
            <p className='mx-28 pt-5'>
              {recipe ? recipe.description : myRecipe.description}
            </p>
          </div>
        </div>
        <div className='card-body'>
          <h3 className='font-rufina-bold block text-center mt-0'>
            Ingredients
          </h3>
          <div className='overflow-x-auto'>
            <table className='table w-5/6 m-auto relative z-0'>
              <thead>
                <tr>
                  <th>
                    <span className='pl-4'>Name</span>
                  </th>
                  <th>Quantity</th>
                  <th>Unit</th>
                  {isAuthenticated && <th>Shopping List</th>}
                </tr>
              </thead>
              <tbody>
                {recipe
                  ? recipe.sections?.map((section) => {
                      return section.components.map((comp, i) => (
                        <tr key={i}>
                          <th>{comp.ingredient.name}</th>
                          <td>{comp.measurements[0].quantity}</td>
                          <td>{comp.measurements[0].unit.name}</td>
                          {isAuthenticated && (
                            <td>
                              <label className='swap swap-rotate'>
                                <>
                                  <input type='checkbox' />
                                  <FontAwesomeIcon
                                    icon={'fa-solid fa-plus' as IconProp}
                                    className='swap-off text-secondary transition-all hover:text-orange-800 ml-10 justify-center text-xl'
                                  />
                                  <FontAwesomeIcon
                                    icon={'fa-solid fa-check' as IconProp}
                                    className='add-Shopping-item-button swap-on text-warning transition-all hover:text-orange-800 ml-10 justify-center text-xl cursor-pointer'
                                    onClick={() => {
                                      addHandlerShoppingList({
                                        name: comp.ingredient.name,
                                        quantity: comp.measurements[0].quantity,
                                        unit: comp.measurements[0].unit.name,
                                      });
                                    }}
                                  />
                                </>
                              </label>
                            </td>
                          )}
                        </tr>
                      ));
                    })
                  : myRecipe.ingredients.map((ingr, i) => (
                      <tr key={i}>
                        <th>{ingr.name}</th>
                        <td>{ingr.quantity}</td>
                        <td>{ingr.unit}</td>
                        <td>
                          <label className='swap swap-rotate'>
                            <>
                              <input type='checkbox' />
                              <FontAwesomeIcon
                                icon={'fa-solid fa-plus' as IconProp}
                                className='swap-off text-secondary transition-all hover:text-orange-800 ml-10 justify-center text-xl'
                              />
                              <FontAwesomeIcon
                                icon={'fa-solid fa-check' as IconProp}
                                className='add-Shopping-item-button swap-on text-warning transition-all hover:text-orange-800 ml-10 justify-center text-xl cursor-pointer'
                                onClick={() =>
                                  addHandlerShoppingList({
                                    name: ingr.name,
                                    quantity: ingr.quantity,
                                    unit: ingr.unit,
                                  })
                                }
                              />
                            </>
                          </label>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
          <h3 className='font-rufina-bold block text-center'>Instructions</h3>
          {recipe
            ? recipe.instructions?.map((instr, i) => (
                <p className='w-5/6 m-auto' key={i}>
                  {instr.display_text}
                </p>
              ))
            : myRecipe.instructions?.map((instr, i) => (
                <p className='w-5/6 m-auto' key={i}>
                  {instr.text}
                </p>
              ))}
          {myRecipe ? null : recipe.renditions ? (
            recipe.renditions?.map(
              (url, i) => (
                <a
                  key={i}
                  className='link-secondary text-center'
                  href={url.url}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {url.url}
                </a>
              ),
              <br />
            )
          ) : (
            <span></span>
          )}
          {myRecipe ? (
            confirm ? (
              <>
                <div className='card-actions justify-end'>
                  <p>Are you sure? This cannot be undone!</p>
                  <button
                    id='confirmDeleteButton'
                    onClick={() => {
                      deleteHandlerRecipe(id);
                    }}
                    className='btn btn-warning'
                  >
                    Yes
                  </button>
                  <button
                    id='cancelDeleteButton'
                    onClick={cancelDelete}
                    className='btn btn-warning'
                  >
                    No
                  </button>
                </div>
              </>
            ) : (
              <div className='card-actions justify-end'>
                <button
                  id='deleteRecipeButton'
                  onClick={confirmDelete}
                  className='btn btn-warning'
                >
                  Delete
                </button>
              </div>
            )
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  ) : (
    <div>Loading...</div>
  );
};

export default RecipeDetails;
