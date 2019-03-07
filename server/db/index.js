'use strict'
const Sequelize = require('sequelize');

const db = require('./database')

const Campus = db.define('campus', {

    name: {
      type: Sequelize.STRING, 
      allowNull: false
    },
    imageUrl: {
      type: Sequelize.STRING, 
      allowNull: true,
    },
    address: {
      type: Sequelize.STRING, 
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true,
      defaultValue: 'No Description Yet'

    }
});

module.exports = {
  // Include your models in this exports object as well!
  db
}
