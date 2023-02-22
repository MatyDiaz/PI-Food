const {getDiets} = require('../controllers/dietsControllers');

const getDietsHandler = async (req, res) => {
    try {
       const wantedDiets = await getDiets();
       res.status(200).json(wantedDiets); 
    } catch (error) {
       res.status(400).json({error:error.message}); 
    }
}

module.exports = {getDietsHandler};