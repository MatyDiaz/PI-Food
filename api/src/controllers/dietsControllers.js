const{Diet} = require('../db');

const getDiets = async () => {
    return await Diet.findAll();
};

module.exports = {getDiets};