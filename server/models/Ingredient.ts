import sequelize from './index';
const { DataTypes } = require('sequelize');
const Recipe = require('./Recipe');

const Ingredient = sequelize.define('ingredient', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  unit: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  quantity: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Ingredient;
