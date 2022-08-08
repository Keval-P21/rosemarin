import * as React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import RecipesList from './components/RecipesList';
import { getRandomRecipe } from './Utils/apiService';
import { Routes, Route } from 'react-router-dom';
import MyRecipesList from './components/MyRecipesList';
import CreateRecipe from './components/CreateRecipe';
import ShoppingList from './components/ShoppingList';
import Menu from './components/Menu';
import WeeklyMenu from './components/WeeklyMenu';
import RecipeDetails from './components/RecipeDetails';
import { getMyRecipes } from './Utils/apiDBService';
import { getMyShoppingList } from './Utils/apiDBServiceShoppingList';
import LoginPage from './components/Login';
import SignupPage from './components/Signup';
import Logout from './components/Logout';
import { Recipe, MyRecipe, Ids, Item } from './Types';
import auth from './Utils/auth';
import apiUserService from './Utils/apiUserService';

function App() {
  const [recipes, setRecipes] = useState([] as Recipe[] | []);
  const [myRecipes, setMyRecipes] = useState([] as MyRecipe[] | []);
  const [ids, setIds] = useState([] as Ids[] | []);
  const [items, setItems] = useState([] as Item[] | []);
  const initialState = auth.isAuthenticated();
  const [isAuthenticated, setIsAuthenticated] = useState(initialState);

  useEffect(() => {
    try {
      apiUserService
        .profile()
        .then((data) => setIsAuthenticated(data.isAuthenticated))
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      getMyShoppingList()
        // .then(recipes => console.log(recipes))
        .then((itemsSL) => setItems([...items, itemsSL]))
        .catch((err) => console.log(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  useEffect(() => {
    // getRandomRecipe()
    //   // .then(recipes => console.log(recipes))
    //   .then((data) => setRecipes(data.results))
    //   .catch((err) => console.log.bind(err));
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
        .catch((err) => console.log.bind(err));
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      getMyRecipes()
        // .then(recipes => console.log(recipes))
        .then((recipes) => setMyRecipes(recipes))
        .catch((err) => console.log.bind(err));
    }
  }, [ids, isAuthenticated]);

  return (
    <div className="font-oxy-regular">
      <Navbar isAuthenticated={isAuthenticated}></Navbar>
      <Routes>
        <Route
          path="/"
          element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
        ></Route>
        <Route
          path="/signup"
          element={<SignupPage setIsAuthenticated={setIsAuthenticated} />}
        ></Route>
        <Route
          path="/logout"
          element={<Logout setIsAuthenticated={setIsAuthenticated} />}
        />

        <Route
          path="/home"
          element={
            <RecipesList
              setRecipes={setRecipes}
              recipes={recipes}
              setIds={setIds}
              ids={ids}
              isAuthenticated={isAuthenticated}
            />
          }
        ></Route>
        <Route
          path="/my_recipes"
          element={
            <MyRecipesList
              myRecipes={myRecipes}
              setMyRecipes={setMyRecipes}
              setIds={setIds}
              ids={ids}
              setRecipes={setRecipes}
              isAuthenticated={isAuthenticated}
            />
          }
        ></Route>
        <Route
          path="/recipes/:id"
          element={
            <RecipeDetails
              recipes={recipes}
              myRecipes={myRecipes}
              setItems={setItems}
            />
          }
        ></Route>
        <Route path="/create" element={<CreateRecipe />}></Route>
        <Route path="/menu" element={<Menu />}></Route>
        <Route path="/weekly_menu" element={<WeeklyMenu />}></Route>
      </Routes>

      {isAuthenticated && <ShoppingList items={items} setItems={setItems} />}
    </div>
  );
}

export default App;
