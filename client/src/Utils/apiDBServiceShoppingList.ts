export const baseDBUrl = 'http://localhost:3001/items';

export const getMyShoppingList = () => {
  return fetch(baseDBUrl, {
    method: 'GET',
    credentials: 'include',
    headers: { 'Content-type': 'application/json' },
  })
    .then((response) => response.json())
    .catch((err) => console.error.bind(err));
};

export const postItem = (recipe) => {
  return fetch(baseDBUrl, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(recipe),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const deleteItem = (id) => {
  console.log(id);
  return fetch(baseDBUrl, {
    method: 'DELETE',
    credentials: 'include',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(id),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
