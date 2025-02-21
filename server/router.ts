import { Request, Response } from 'express';
const router = require('express').Router();
const userController = require('./controllers/userController');
const recipeController = require('./controllers/recipeController');
const fileMiddleware = require('./middlewares/uploadFileMiddleware');
const shoppingListController = require('./controllers/shoppingListController');
const authMiddleware = require('./middlewares/authMiddleware');

router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/me', authMiddleware, userController.profileUser);
router.get('/logout', authMiddleware, userController.logoutUser);

router.post(
  '/recipes',
  authMiddleware,
  fileMiddleware,
  recipeController.createRecipe
);
router.put(
  '/recipes/:id',
  authMiddleware,
  fileMiddleware,
  recipeController.updateRecipe
);
router.delete('/recipes', authMiddleware, recipeController.removeRecipe);
router.get('/recipes', authMiddleware, recipeController.getAllRecipes);

router.post('/items', authMiddleware, shoppingListController.addItem);
router.put('/items', authMiddleware, shoppingListController.updateItem);
router.delete('/items', shoppingListController.removeItem);
router.get('/items', authMiddleware, shoppingListController.getAllItems);

router.get('*', function (req: Request, res: Response) {
  res
    .status(404)
    .send(
      "<h1 style='margin: 50px auto; display: flex; justify-content: center'>Page Not found</h1>"
    );
});

module.exports = router;
