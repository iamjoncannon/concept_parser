'use strict'

const { db  } = require('./server/db')
const app = require('./server')
const PORT = 1337
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// const pageParser = require('./parser/sentence_node')
const { Sentence, Concept, Edge } = require('./server/db/index')
// const sentenceParser = require('./parser/sentence_parser')

// const concept_processor = require('./parser/concept_processor')

async function startServer(){

	await db.sync()

	let concepts = await Concept.findAll({
		where: {
			weight : {
				[Op.gte]: 10000 
			}
		}
	})

	console.log(concepts)

    console.log('db synced')

    app.listen(PORT, () => console.log(`serving on port ${PORT}`))
}

startServer()
