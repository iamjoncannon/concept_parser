'use strict'

const { db  } = require('./server/db')
const app = require('./server')
const PORT = 1337
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// const pageParser = require('./parser/sentence_node')
const { Sentence, Concept, Edge } = require('./server/db/index')
let getGraphData = './server/api/getGraphData'

// const sentenceParser = require('./parser/sentence_parser')

// const concept_processor = require('./parser/concept_processor')

// const concept_relative_weight = require('./parser/concept_relative_weight')


async function startServer(){

	await db.sync()

    console.log('db synced')
    
    app.listen(PORT, () => console.log(`serving on port ${PORT}`))
}

startServer()
