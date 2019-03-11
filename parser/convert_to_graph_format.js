function convertToGraph(edgeFilter){

	// take the concepts and filter out the ones that are less connected

	// console.log('converting to graph')

	let filteredNodes = Object.entries(concepts).filter(([name, edges])=> {
		// console.log('filtering insignificant nodes: ', name)
		return Object.entries(edges).length > edgeFilter // this filters by number of edges on each concept
	})

	// make a copy of the array array back into a new reference object to perform a lookup

	let referenceCopy = filteredNodes.slice().reduce((a,b) => {
		// console.log('converting back to objects: ', b[0])
		return {...a, [b[0]] : b[1]}
	}, {})

	// console.log(referenceCopy['knowledge'])
	
	// iterate over each set of edges and delete the edge entries that themselves
	// are not in the reference copy
	// in other words, we only want the edges that themselves are dense

	let biggestEdge = 0; // measure the total number of edges to generate relative edge opacity

	let theseNodes = filteredNodes.map(([name, edges]) => {

		// console.log(Object.entries(edges))
		let newEdges = Object.entries(edges).filter(edge => referenceCopy[edge[0]]).reduce((a,b) => {
			// console.log('erasing edges from concepts that have been deleted', b[0])

			b[1].length > biggestEdge ? biggestEdge = b[1].length : '' ;
			
			return {...a, [b[0]] : b[1]}
		}, {})




		return [name, newEdges]

		// edges = Object.entries(edges[0].filter(edge => referenceCopy[edge])

	}) 
	// .reduce((a,b) => {
	// 		// console.log(b)
	// 		return {...a, [b[0]] : b[1]}
	// 	}, {})

	// console.log(theseNodes)

	// console.log(totalEdges)

	let cache = { }

	for (let i = 0; i < theseNodes.length; i++){

		let nodeName = theseNodes[i][0];

		let nodeEdges = theseNodes[i][1]

		let edgeSize = Object.entries(nodeEdges).length

		let newNode = {
						id : nodeName,
						name : nodeName,
						desc : nodeName,
						nodeVal : edgeSize
					}

		graphNodes.nodes.push(newNode)


		let source = theseNodes[i][0];

		// console.log('converting to graph format: ', source)

		for (let k = 0; k < Object.entries(nodeEdges).length; k++){

			let target = Object.entries(nodeEdges)[k][0];

			cache[source] = { ...cache[source]}
			cache[target] = { ...cache[target]}

			if(!cache[target][source]){

				graphNodes.links.push({
					source: source,
					target : target,
					// linkOpacity: Object.entries(nodeEdges)[k][1].length / biggestEdge

				})
			}
			
				cache[source][target] = true
		}

		// console.log(cache)
	}
}

module.exports = convertToGraph
