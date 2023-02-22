const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Recipe', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    healthScore: {
      type: DataTypes.INTEGER,
      validate:{
        min: 0,
        max: 100,
      }
    },
    analyzedInstructions: {
      type: DataTypes.TEXT,
    },
    created : {
      type : DataTypes.BOOLEAN,
      defaultValue: true,
    }
  

  }, {timestamps: false });
};

//prueba GitHub!