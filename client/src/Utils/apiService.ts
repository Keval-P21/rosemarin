import { recipeCache } from '../data';
import { Instruction, Recipe, Section, Tag } from '../Types';

//The below commented out code is for use when using data from the Tasty API. It requires a API key and Host provided by Rapid API

// const headers = {
//   'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
//   'X-RapidAPI-Host': process.env.REACT_APP_HOST,
// };
// const baseURL = 'https://tasty.p.rapidapi.com/recipes/list?from=0&size=20';

export const getRandomRecipe = (tag = null) => {
  //The below code is for use when using data from the Tasty API. It requires a API key and Host provided by Rapid API

  // const tagURL = '';
  // if (tag) tagURL = `&tags=${tag}`;
  // const options = {
  //   method: 'GET',
  //   headers: headers,
  // };
  // const recipes = await fetch(`${baseURL}${tagURL}`, options)
  // 	.then(response => response.json())
  // 	.catch(err => console.error(err));

  // The below code is used for delivering data from the mock data.$
  const recipes = recipeCache;

  // The below code is not to be touched, it is for use with both forms of data.
  const res: Recipe[] = recipes.reduce((acc: Recipe[], recipe) => {
    acc = [
      ...acc,
      {
        name: recipe.name,
        thumbnail_url: recipe.thumbnail_url,
        description: recipe.description as string,
        sections: recipe.sections as Section[] | [],
        instructions: recipe.instructions as Instruction[],
        renditions: recipe.renditions,
        id: recipe.id,
        tags: recipe.tags,
      },
    ];
    return acc;
  }, []);

  return tag
    ? res.filter((recipe) =>
        recipe.tags!.some((recipeTag: Tag) => recipeTag.name === tag)
      )
    : res;
};
