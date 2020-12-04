const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('postgres://daraovcinnikova@localhost:5432/weather_db');

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

module.exports = sequelize.define('weather', {
  day: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  temperature: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  wind: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  sky: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// sequelize.sync({ force: true });
// console.log('the model was syncronized');
