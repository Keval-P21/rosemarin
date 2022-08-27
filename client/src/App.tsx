import * as React from 'react';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import CreateRecipe from './components/CreateRecipe';
import LoginPage from './components/Login';
import Logout from './components/Logout';
import Menu from './components/Menu';
import MyRecipesList from './components/MyRecipesList';
import Navbar from './components/Navbar';
import RecipeDetails from './components/RecipeDetails';
import RecipesList from './components/RecipesList';
import ShoppingList from './components/ShoppingList';
import SignupPage from './components/Signup';
import { Ids, Item, MyRecipe, Recipe } from './Types';
import { getMyRecipes } from './Utils/apiDBService';
import { getMyShoppingList } from './Utils/apiDBServiceShoppingList';
import { getRandomRecipe } from './Utils/apiService';
import apiUserService from './Utils/apiUserService';
import auth from './Utils/auth';

function App() {
  const [recipes, setRecipes] = useState([] as Recipe[]);
  const [myRecipes, setMyRecipes] = useState([] as MyRecipe[]);
  const [ids, setIds] = useState([] as Ids[] | []);
  const [items, setItems] = useState([] as Item[]);
  const initialState = auth.isAuthenticated();
  const [isAuthenticated, setIsAuthenticated] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    apiUserService
      .profile()
      .then((data) => setIsAuthenticated(data.isAuthenticated))
      .catch((err) => {
        setErrorMessage('Error logging you in');
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      getMyShoppingList()
        .then((itemsSL) => setItems([...items, itemsSL]))
        .catch((err) => {
          setErrorMessage('Error logging getting your shopping list');
          console.log(err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  useEffect(() => {
    // Only use one of the below methods!

    // The below code is only for use if the API call to Tasty are implemented, otherwise this site is using mock data.

    // getRandomRecipe()
    //   .then((data) => setRecipes(data.results))
    //   .catch((err) => console.log(err));

    // The below code is only for use if using the mock data and not the Tasty API

    setRecipes(getRandomRecipe());
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      getMyRecipes()
        .then((recipes) =>
          recipes.map((el) =>
            setIds((prev) => {
              const id = el.id;
              const id_tasty = el.id_tasty;
              const filtered = prev.filter(
                (e: MyRecipe) => e.id_tasty !== el.id_tasty
              );
              return [...filtered, { id, id_tasty }];
            })
          )
        )
        .catch((err) => {
          setErrorMessage('Error getting your recipe list');
          console.log(err);
        });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      getMyRecipes()
        .then((recipes) => setMyRecipes(recipes))
        .catch((err) => {
          setErrorMessage('Error getting your recipe list');
          console.log(err);
        });
    }
  }, [ids, isAuthenticated]);

  return (
    <div className='font-oxy-regular'>
      <Navbar
        isAuthenticated={isAuthenticated}
        errorMessage={errorMessage}
      ></Navbar>
      <Routes>
        <Route
          path='/'
          element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
        ></Route>
        <Route
          path='/signup'
          element={<SignupPage setIsAuthenticated={setIsAuthenticated} />}
        ></Route>
        <Route
          path='/logout'
          element={
            <Logout
              setIsAuthenticated={setIsAuthenticated}
              setErrorMessage={setErrorMessage}
            />
          }
        />
        <Route
          path='/home'
          element={
            <RecipesList
              setRecipes={setRecipes}
              recipes={recipes}
              setIds={setIds}
              ids={ids}
              isAuthenticated={isAuthenticated}
              setErrorMessage={setErrorMessage}
            />
          }
        ></Route>
        <Route
          path='/my_recipes'
          element={
            <MyRecipesList
              myRecipes={myRecipes}
              setMyRecipes={setMyRecipes}
              setIds={setIds}
              ids={ids}
              setRecipes={setRecipes}
              isAuthenticated={isAuthenticated}
              setErrorMessage={setErrorMessage}
            />
          }
        ></Route>
        <Route
          path='/recipes/:id'
          element={
            <RecipeDetails
              recipes={recipes}
              myRecipes={myRecipes}
              setItems={setItems}
              isAuthenticated={isAuthenticated}
              setErrorMessage={setErrorMessage}
            />
          }
        ></Route>
        <Route
          path='/create'
          element={<CreateRecipe isAuthenticated={isAuthenticated} />}
        ></Route>
        <Route path='/menu' element={<Menu />}></Route>
      </Routes>

      {isAuthenticated && (
        <ShoppingList
          items={items}
          setItems={setItems}
          setErrorMessage={setErrorMessage}
        />
      )}
    </div>
  );
}

export default App;
