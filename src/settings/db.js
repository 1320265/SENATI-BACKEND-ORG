const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    "senati-users", "root", "", {host: "localhost", dialect: "mysql"}
);

module.exports = sequelize;