const {Router} = require('express');

const recipesRouter = Router();

const {getByNameHandler, getByIdHandler, createRecipeHandler} = require('../handlers/recipesHandlers');

recipesRouter.get('/', getByNameHandler);

recipesRouter.get('/:id', getByIdHandler);

recipesRouter.post('/', createRecipeHandler);

module.exports = {
    recipesRouter,
}