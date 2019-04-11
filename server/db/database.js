'use strict'

const chalk = require('chalk')
const Sequelize = require('sequelize')
const pkg = require('../../package.json')

console.log(chalk.yellow('Opening database connection'))

process.env.DATABASE_URL = 'postgres://jonathancannon:yadayada@ec2-54-245-2-126.us-west-2.compute.amazonaws.com:5432/graphing_Hegel'
console.log("process.env.DATABASE_URL = ", process.env.DATABASE_URL)


const db = new Sequelize(process.env.DATABASE_URL, {
  logging: false, // so we don't see all the SQL queries getting made
  dialect: "postgres",
	dialectOptions: {
	  "ssl": true
	}
})

module.exports = db
