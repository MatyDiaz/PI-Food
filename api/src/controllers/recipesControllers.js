const {cache} = require('../../cache');
const {cacheDos} = require('../../cacheDos');
const {Recipe} = require('../db');
const {Diet} = require('../db')
const {Op} = require('sequelize');
//const axios = require('axios');

const cleanArray = (arr) => {
    const clean = arr.map(el => {
        return {
            id:el.id,
            image:el.image,
            title:el.title,
            dishTypes: el.dishTypes,
            healthScore: el.healthScore,
            diets: el.diets,
            summary: el.summary,
            analyzedInstructions: el.analyzedInstructions[0].steps.map(el => el.step),

        };
    });
    return clean;
}


const getByName = async (name) => {

    if(name.length < 3) throw new Error('El parametro de busqueda es insuficiente')

    const apiRecipesRaw = cacheDos.results.filter(
        recipe => recipe.title.toLowerCase().includes(name.toLowerCase())
    );

    const apiRecipes = cleanArray(apiRecipesRaw)

    const bdRecipes = await Recipe.findAll({
        where:{
            title:{[Op.iLike]:`%${name}%`}
        },
        include:{
            model: Diet,
            through: {
                attributes:[],
            }
        },
    });

    return [...apiRecipes, ...bdRecipes];
    
    // let list = [];
    // cache.results.forEach(recipe => {
    //     if (recipe.title.toLowerCase().includes(name.toLowerCase())) list.push(recipe);
    // });

    // if(!list.length) throw new Error('No hay recetas con ese parametro de busqueda');

    // return list;
    
};

const getById = async (id, source) => {

    if(source === 'api') {
        const wantedRecipe = cacheDos.results.find( recipe => recipe.id == id);

        let newRecipe = {
            image: wantedRecipe.image,
            name: wantedRecipe.title,
            dishTypes: wantedRecipe.dishTypes,
            diets: wantedRecipe.diets,
            summary: wantedRecipe.summary,
            healthScore: wantedRecipe.healthScore,
            analyzedInstructions: wantedRecipe.analyzedInstructions[0].steps.map( el => el.step ),
        };
        return newRecipe;
    } else {
        const wantedRecipe = await Recipe.findByPk(id);
        return wantedRecipe;
    }

    

    // const wantedRecipe = 
    //     source === 'api'
    //         ? await cacheDos.results.find( recipe => recipe.id == id)
    //         : await Recipe.findByPk(id);
            


    // return wantedRecipe;

};

const createRecipe = async (title, summary, healthScore, analyzedInstructions) => {

    const newRecipe = await Recipe.create({title, summary, healthScore, analyzedInstructions});

    return newRecipe;

}


module.exports = {
    getByName,
    getById,
    createRecipe,
}