'use strict'
const Sequelize = require('sequelize');

const db = require('./database')

const Concept = db.define('concept', {

    name: {
      type: Sequelize.STRING, 
      // allowNull: false
    },
    frequency: {
      type: Sequelize.INTEGER
    },
    weight: {
      type: Sequelize.INTEGER
    },
    relativeweight : {
      type: Sequelize.INTEGER
    }
});

const Edge = db.define('edge', {

  sourceId: {
    type: Sequelize.INTEGER
  },
  targetId: {
    type: Sequelize.INTEGER
  },
  locationId: {
    type: Sequelize.INTEGER
  }
})

const Sentence = db.define('sentence', {

    section: {
      type: Sequelize.STRING, 
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    weight: {
      type: Sequelize.INTEGER
    }
})

const EdgeWeight = db.define('edgeweight', {

  sourceId: {
    type: Sequelize.INTEGER
  },
  targetId: {
    type: Sequelize.INTEGER
  },
  weight: {
    type: Sequelize.INTEGER
  }
})

// alter table concepts add relativeweight integer;

// create table <table name> {column names and types}

module.exports = {
  // Include your models in this exports object as well!
  db,
  Concept,
  Edge,
  Sentence,
  EdgeWeight
}
