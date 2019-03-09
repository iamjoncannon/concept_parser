const { Sentence, Concept, Edge, Weight } = require('./../../server/db/index')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const edgeClip = require('./../../parser/edge_clip')

async function getGraphData(query){

	let concepts = await Concept.findAll({
		where: {
			weight : {
				[Op.gt]: query.NodeDensity
			},
		},
		attributes: ['id', 'name']
	})

	let edges = []

	concepts = concepts.map(data => data = data.dataValues)

	conceptCache = { }

	for(let concept of concepts){

		conceptCache[concept.id] = true

		try {

			theseEdges = await Edge.findAll({
							where : {
								
								  [Op.or]: [
								    {
								      sourceId: concept.id
								    },
								    {
								      targetId: concept.id
								    }
								  ]
							},
							attributes: ['sourceId', 'targetId']
						})
			theseEdges = theseEdges
							.map(data => data = data.dataValues)
								.map(function(data){

									let newObject = {
														
										source: data.sourceId,
										target: data.targetId
									}
									
									return newObject
								})

			// theseEdges.filter((edge, i) => !edges.splice(1, i).includes(edge))
			edges.push(...theseEdges)

		}
		catch(err){
			console.log(err)
		}

	}

	let data = {
		nodes: concepts,
		links: edges
				.filter( edge => conceptCache[edge.target] && conceptCache[edge.source])
	}

	return data
}

module.exports = getGraphData