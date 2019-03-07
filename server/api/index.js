'use strict'

const router = require('express').Router()
// const { Student, Campus } = require('./../db/index')
const graphNodes = require('./../../hegel_parser')

router.get('/hegel', async (req, res, next)=>{
	
	res.json(JSON.stringify(graphNodes))
	res.end()
})

router.use((req, res, next) => {
  const err = new Error('API route not found!')
  err.status = 404
  next(err)
})

module.exports = router
