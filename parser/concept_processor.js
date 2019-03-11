
const { Sentence, Concept, Edge, Weight } = require('./../server/db/index')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


async function concept_weight(concepts){

	// console.log(concepts)

	// the weight of the node is determined by 
	// its number edges

	for (let index of concepts){
		// console.log('this is the index: ', index)
		try{

			let edges =	await Edge.findAll({
							where : {
								
								  [Op.or]: [
								    {
								      sourceId: index.id
								    },
								    {
								      targetId: index.id
								    }
								  ]
							}
						})

		
			index = await index.update({
				weight : edges.length
			})

			console.log(index.weight)

		}
		catch(err){
			console.log(err)
		}		
	}
	
}

module.exports = concept_weight