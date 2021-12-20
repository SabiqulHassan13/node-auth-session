const { Sequelize } = require("sequelize");

const { DB_HOST, DB_NAME, DB_USER, DB_PASS } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: "mysql",
});

async function connectMysql() {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");

    // await sequelize.sync({ force: true });
    await sequelize.sync({ alter: true });
    console.log("All models were synchronized successfully");
  } catch (err) {
    console.log("Database connection failed: " + err);
  }
}

module.exports = { sequelize, connectMysql };
