const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  's3970295_fsd_a2', // database name
  's3970295_fsd_a2', // username
  'abc123', // password
  {
    host: 'rmit.australiaeast.cloudapp.azure.com',
    dialect: 'mysql',
    logging: false
  }
);

module.exports = sequelize;
