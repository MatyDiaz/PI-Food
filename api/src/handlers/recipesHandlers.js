const {getByName, getById, createRecipe} = require('../controllers/recipesControllers.js')

const getByNameHandler =async (req, res) =>{

    const {name} = req.query;

    try {
        const response = await getByName(name);
       
       res.status(200).json(response); 
    } catch (error) {
        res.status(400).json({error:error.message});
    }
};

const getByIdHandler = async(req, res) => {
    const {id} = req.params;

    const source = isNaN(id)? 'BDD' : 'api';

    try {
        const recipe = await getById( id, source);
        res.status(200).json(recipe);
    } catch (error) {
        res.status(400).json({error:error.message});
    }

};

const createRecipeHandler = async (req, res) => {
    const {title, summary, healthScore, analyzedInstructions, diets} = req.body;
    try {
        const newRecipe = await createRecipe(title, summary, healthScore, analyzedInstructions);
        await newRecipe.addDiets(diets);
        res.status(200).json(newRecipe);
        
    } catch (error) {
      res.status(400).json({error: error.message});  
    }
};

module.exports = {getByNameHandler, getByIdHandler, createRecipeHandler}
