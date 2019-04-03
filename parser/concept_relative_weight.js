
const { Sentence, Concept, Edge, Weight } = require('./../server/db/index')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


async function concept_relative_weight(concepts){

	// console.log(concepts)

	// the relativeweight of the node is determined by 
	// the weight of the nodes to which it is connected

	for (let concept of concepts){

		// console.log('this is the concept: ', concept)
		
		try{

			let edges =	await Edge.findAll({
							where : {
								
								  [Op.or]: [
								    {
								      sourceId: concept.id
								    },
								    {
								      targetId: concept.id
								    }
								  ]
							}
						})

			let relativeWeight = 0

			for(let edge of edges){

			// 	// the other node whose weight needs to be queried

				let otherNodeId

				edge.sourceId === concept.id ? otherNodeId = edge.targetId : otherNodeId = edge.sourceId ;

				let otherNode = await Concept.findById(otherNodeId)

				relativeWeight += otherNode.weight
			}

			updatedConcept = await concept.update({
				relativeweight : relativeWeight
			})



		}
		catch(err){
			console.log(err)
		}		
	}
	
}

module.exports = concept_relative_weight
