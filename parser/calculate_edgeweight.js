const { Sentence, Concept, Edge, EdgeWeight } = require('./../server/db/index')
const Sequelize = require('sequelize');

async function calculateEdgeWeight(edges){


	let cache = {

	}

	for(let edge of edges){

		// console.log(edge)

		if(!cache[edge.sourceId]){
			
			cache[edge.sourceId] = { }
			cache[edge.sourceId][edge.targetId] = 1
		}
		else if(!cache[edge.sourceId][edge.targetId]){

			cache[edge.sourceId][edge.targetId] = 1
		}
		else if(cache[edge.sourceId][edge.targetId]){

			cache[edge.sourceId][edge.targetId]++
		}

	}


	cache = Object.entries(cache)

	for(let edge of cache){
		console.log(edge)

		let source = edge[0]
		let targets = Object.entries(edge[1])

		for(let target of targets){

			let edgeweight = await EdgeWeight.create({
				sourceid: Number(source),
				targetid: Number(target[0]),
				weight: target[1]
			})
		
			console.log(edgeweight)
		}
	}


	console.log('finished')
}

module.exports = calculateEdgeWeight