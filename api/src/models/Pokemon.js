const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [0, 15]
      }
    },

    hp: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 1000
      }
    },

    attack: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 1000
      }
    },

    defense: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 1000
      }
    },

    speed: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 1000
      }
    },

    height: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 1000
      }
    },

    weight: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 10000
      }
    }
  },
  {timestamps: false});
};
