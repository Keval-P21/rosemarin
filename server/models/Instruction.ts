import sequelize from './index';
const { DataTypes } = require('sequelize');
const Recipe = require('./Recipe');

const Instruction = sequelize.define('instruction', {
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  temperature: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = Instruction;
