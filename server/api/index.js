'use strict'

const router = require('express').Router()
// const graphNodes = require('./../../hegel_parser')
let fs = require('fs')

let getGraphData = require('./getGraphData')

let blank = {
    nodes: [
        {
          id: "id1",
          name: "name1",
          val: 1
        },
        {
          id: "id2",
          name: "name2",
          val: 200
        },

    ],
    links: [
        {
            source: "id1",
            target: "id2"
        },
 
    ]
}

router.get('/hegel', async (req, res, next)=>{
	
	res.json(JSON.stringify(blank))
	res.end()
})

router.get('/hegel/data', async (req, res, next)=>{
  
  // text = fs.readFileSync('./fulltext.json', 'utf8');

  let graphData = await getGraphData(req.query)

  // console.log(graphData)

  res.json(JSON.stringify(graphData))

  res.end()
})

router.use((req, res, next) => {
  const err = new Error('API route not found!')
  err.status = 404
  next(err)
})

module.exports = router
