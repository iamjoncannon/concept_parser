const { Sentence, Concept, Edge, EdgeWeight } = require('./../../server/db/index')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const edgeClip = require('./../../parser/edge_clip')

async function getGraphData(query){

	let filterType = query.filterType === 'Absolute density' ? 'weight' : 'relativeweight';
	let queryFactor = query.filterType === 'Absolute density' ? 1 : 3000;

	colorFactor = (weight) => {

		let { edgeDensityDegrees, EdgeDensity, degreeRange } = query

		let colors = ["#FF0000", "#FFFFFF", "#008000"]

		if(edgeDensityDegrees === '1'){

			return colors[0]
		}

		if(edgeDensityDegrees === '2'){

			let part

			weight > Number(EdgeDensity) + Number(degreeRange) ? part = 0 : part = 1 ;

			return colors[part]
		}

		if(edgeDensityDegrees === '3'){

			let part

			weight > Number(EdgeDensity) + Number(degreeRange) ? part = 0 : 
			weight > Number(EdgeDensity) + (Number(degreeRange)/2) ? part = 1 : part = 2;

			return colors[part]
		}
	}

	let concepts = await Concept.findAll({
		where: {
			[filterType] : {
				[Op.gt]: query.NodeDensity * queryFactor
			},
		},
		attributes: ['id', 'name', 'weight']
	})

	let edges = []

	concepts = concepts.map(data => data = data.dataValues)

	let conceptCache = { }

	for(let concept of concepts){

		conceptCache[concept.id] = true

		try {
				theseEdges = await EdgeWeight.findAll({
							where : {
								
								      sourceid: concept.id
								   
									},
						})
			
			theseEdges = theseEdges
							.filter(edge => edge.dataValues.weight > query.EdgeDensity)
							.map(data => data = data.dataValues)
								.map(function(data){

									let newObject = {
										name : '',	
										source: data.sourceid,
										target: data.targetid,
										weight: data.weight,
										color: colorFactor(data.weight)
									}
									
									return newObject
								})

			edges.push(...theseEdges)
		}
		catch(err){
			console.log(err)
		}
	}

	let edgeCache = { }
	
	let data = {
		links: edges
				.filter( edge => conceptCache[edge.target] && conceptCache[edge.source])
				.map( function(edge){ 
									edgeCache[edge.target] = true 
									edgeCache[edge.source] = true
									return edge
								} ) ,
		nodes: concepts
				.filter(node => edgeCache[node.id])
	}

	return data
}

module.exports = getGraphData