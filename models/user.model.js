const { Sequelize, DataTypes } = require("sequelize");

const { sequelize } = require("../config/sequelize");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: 0,
  },
});

module.exports = User;

// const mongoose = require("mongoose");
// const { Schema } = mongoose;

// const userSchema = new Schema({
//   username: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   is_admin: { type: Boolean, default: 0 },
// });

// const User = mongoose.model("User", userSchema);

// module.exports = User;
