import * as React from 'react';
import { useState } from 'react';
import TopSection from './TopSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Ingredient, Instruction } from '../Types';
import { postRecipe } from '../Utils/apiDBService';
import { useNavigate } from 'react-router-dom';
import { MyRecipe } from '../Types';

function CreateRecipe() {
  const [ingredients, setIngredients] = useState([
    { name: '', quantity: '', unit: '' },
  ] as Ingredient[]);
  const [instructions, setInstructions] = useState([''] as Instruction[]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTmpIngredients = ingredients.reduce(
      (ingreds: Ingredient[], ing) => {
        const itemIndex = ingreds.findIndex((item) => item.name === ing.name);
        if (itemIndex === -1) {
          ingreds = [...ingreds, ing];
        } else {
          ingreds[itemIndex].quantity = (
            Number(ingreds[itemIndex].quantity) + Number(ing.quantity)
          ).toString();
        }
        return ingreds;
      },
      []
    );

    const recipe: MyRecipe = {
      title: e.target.title.value,
      description: e.target.description.value,
      img_url: e.target.url.value || null,
      // files: e.target[7].files[0] || null,
      img_alt_text: e.target.title.value || null,
      ingredients: newTmpIngredients,
      instructions: instructions,
    };
    postRecipe(recipe)
      .then((res) => {
        e.target.reset();
        navigate('/my_recipes');
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage('Unable to add recipe.');
      });
  };

  const addHandlerIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: '', unit: '' }]);
  };

  const delHandlerIngredient = () => {
    if (ingredients.length === 1) return;
    const rows = [...ingredients];
    rows.splice(-1, 1);
    setIngredients(rows);
  };

  const addHandlerInstruction = () => {
    setInstructions([...instructions, '' as Instruction]);
  };

  const delHandlerInstruction = () => {
    if (instructions.length === 1) return;
    const rows = [...instructions];
    rows.splice(-1, 1);
    setInstructions(rows);
  };

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const list = [...ingredients];
    list[index][name] = value;
    setIngredients(list);
  };

  const handleChangeInstructions = (index, event) => {
    const { value } = event.target;
    const list = [...instructions];
    list[index] = value;
    setInstructions(list);
  };

  return (
    <>
      <TopSection></TopSection>
      <form
        // ref={form}
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        className="w-2/3 m-auto form-control prose lg:prose-xl mb-40"
      >
        <h2 className="m-auto font-rufina-bold">Create your own recipe</h2>
        <div>
          <label className="label">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Type here title of your recipe..."
            className="input input-bordered w-full hover:bg-slate-50"
            required
          />
        </div>

        <div>
          <label className="label">Description</label>
          <textarea
            name="description"
            id="description"
            placeholder="Type here description of your recipe..."
            className="textarea input-bordered w-full hover:bg-slate-50 cursor-pointer"
            required
          />
        </div>

        <div>
          <label className="label justify-start mr-10">
            Ingredients
            <FontAwesomeIcon
              icon={'fa-solid fa-plus' as IconProp}
              className="text-warning transition-all hover:text-2xl ml-10"
              id="addIngredient"
              onClick={addHandlerIngredient}
            />
            <FontAwesomeIcon
              icon={'fa-solid fa-minus' as IconProp}
              className="text-warning transition-all hover:text-2xl cursor-pointer ml-10"
              id="delIngredient"
              onClick={delHandlerIngredient}
            />
          </label>
          {ingredients.map((data, i) => {
            const { name, quantity, unit } = data;
            return (
              <div key={i} className="flex justify-between mb-3">
                <input
                  type="text"
                  id={`name-${i}`}
                  name="name"
                  value={name}
                  placeholder="Type here ingredient.."
                  className="input input-bordered w-1/3 hover:bg-slate-50"
                  onChange={(event) => handleChange(i, event)}
                />
                <input
                  type="number"
                  id={`quantity-${i}`}
                  value={quantity}
                  name="quantity"
                  placeholder="quantity.."
                  className="input input-bordered w-1/4 mr-3 hover:bg-slate-50"
                  onChange={(event) => handleChange(i, event)}
                />
                <input
                  type="text"
                  id={`unit-${i}`}
                  value={unit}
                  name="unit"
                  placeholder="unit.."
                  className="input input-bordered w-1/3 hover:bg-slate-50"
                  onChange={(event) => handleChange(i, event)}
                />
              </div>
            );
          })}
        </div>

        <div>
          <label className="label justify-start mr-10">
            Instructions
            <FontAwesomeIcon
              icon={'fa-solid fa-plus' as IconProp}
              className="text-warning transition-all hover:text-2xl cursor-pointer ml-10"
              id="addInstruction"
              onClick={addHandlerInstruction}
            />
            <FontAwesomeIcon
              icon={'fa-solid fa-minus' as IconProp}
              className="text-warning transition-all hover:text-2xl cursor-pointer ml-10"
              id="delInstruction"
              onClick={delHandlerInstruction}
            />
          </label>
          {instructions.map((instruction, i) => {
            return (
              <textarea
                key={i}
                name="instruction"
                id={`instruction-${i}`}
                value={instruction as string}
                placeholder="Type here instruction.."
                className="textarea input-bordered w-full hover:bg-slate-50"
                onChange={(event) => handleChangeInstructions(i, event)}
              />
            );
          })}
        </div>

        <div>
          <label className="label">URL of image</label>
          <input
            type="input"
            name="url"
            placeholder="Type here URL if needed.."
            className="input input-bordered w-full hover:bg-slate-50"
          />
        </div>

        <div>
          <label className="label">Upload image</label>
          <input
            type="file"
            name="file"
            className="block w-full text-sm text-slate-500
                       file:mr-4 file:py-2 file:px-4
                       file:square file:border-0
                       file:text-sm file:font-semibold
                       file:bg-fuchsia-50 file:text-accent-700
                       hover:file:bg-base-300 mb-10"
          />
        </div>

        <button
          id="submit"
          type="submit"
          className="btn btn-neutral font-rufina-regular"
        >
          Submit
        </button>
        <div className="alert-error">{errorMessage}</div>
      </form>
    </>
  );
}

export default CreateRecipe;
