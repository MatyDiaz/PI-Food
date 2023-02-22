const {Diet} = require('./db');

const dietTypes = [
    {name:'Gluten Free'},
    {name:'ketogenic'},
    {name:'Vegetarian'},
    {name:'Lacto-Vegetarian'},
    {name:'Ovo-Vegetarian'},
    {name:'Vegan'},
    {name:'Pescetarian'},
    {name:'Paleo'},
    {name:'Primal'},
    {name:'Low FODMAP'},
    {name:'Whole30'},
];

const seeders = async () => {
    const results = await Diet.findAll();
    if(!results.length) {
        Diet.bulkCreate(dietTypes);
    } 
};

module.exports = seeders;
