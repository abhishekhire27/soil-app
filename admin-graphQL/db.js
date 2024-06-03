const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "s3970295_fsd_a2",
  "s3970295_fsd_a2",
  "abc123",
  {
    host: "rmit.australiaeast.cloudapp.azure.com",
    dialect: "mysql",
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;
