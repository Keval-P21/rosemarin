const baseDBUrl = 'http://localhost:3001/recipes';

export const getMyRecipes = () => {
  return fetch(baseDBUrl, {
    method: 'GET',
    credentials: 'include',
    headers: { 'Content-type': 'application/json' },
  })
    .then((response) => response.json())
    .catch((err) => console.error(err));
};

export const postRecipe = (recipe) => {
  return fetch(baseDBUrl, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(recipe),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const deleteRecipe = (id) => {
  return fetch(baseDBUrl, {
    method: 'DELETE',
    credentials: 'include',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ id }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
