'use strict'

const router = require('express').Router()
// const graphNodes = require('./../../hegel_parser')
let fs = require('fs')

let getGraphData = require('./getGraphData')

router.get('/hegel', async (req, res, next)=>{
	
	res.json(JSON.stringify(blank))
	res.end()
})

router.get('/hegel/data', async (req, res, next)=>{
  
  let graphData = await getGraphData(req.query)

  res.json(JSON.stringify(graphData))

  res.end()
})

router.use((req, res, next) => {
  const err = new Error('API route not found!')
  err.status = 404
  next(err)
})

module.exports = router
