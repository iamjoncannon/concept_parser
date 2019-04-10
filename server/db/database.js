'use strict'

const chalk = require('chalk')
const Sequelize = require('sequelize')
const pkg = require('../../package.json')

console.log(chalk.yellow('Opening database connection'))
console.log("process.env.DATABASE_URL = ", process.env.DATABASE_URL)


const db = new Sequelize(process.env.DATABASE_URL, {
  logging: false // so we don't see all the SQL queries getting made
})

module.exports = db
