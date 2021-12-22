const { Sequelize, DataTypes } = require("sequelize");

const { sequelize } = require("../config/sequelize");

const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productFile: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Product;
