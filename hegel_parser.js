/*

// console.clear()

// const natural = require("natural");
// const path = require("path");
// let fs = require('fs')

// const base_folder = path.join(path.dirname(require.resolve("natural")), "brill_pos_tagger");
// const rulesFilename = base_folder + "/data/English/tr_from_posjs.txt";
// const lexiconFilename = base_folder + "/data/English/lexicon_from_posjs.json";
// const defaultCategory = 'N';
// const lexicon = new natural.Lexicon(lexiconFilename, defaultCategory);
// const rules = new natural.RuleSet(rulesFilename);
// const tagger = new natural.BrillPOSTagger(lexicon, rules);

// let text

// try {
// 	// text = fs.readFileSync('./Hegel-TheScienceofLogic.txt', 'utf8');	
// 	text = fs.readFileSync('./firstchapter.txt', 'utf8');	
// }
// catch(err){
// 	console.log(err)
// }

// const parser = (inputText) => {

// 	// console.log("parsing: \n", inputText)

// 	output = inputText.replace(/[.,\/#!$%\^&\*;:{}=\_`~()0-9\n]/g,"")

// 	let tagged = tagger.tag(output.split(' '))

// 	let treebank = 'N' || 'NN' || 'JJ'

// 	tagged.taggedWords = tagged.taggedWords.filter(x => x.tag === 'N' || x.tag === 'NN' || x.tag === 'JJ').filter(x => x.token.length > 4)

// 	return tagged
// }



// function pageParser(theText){

// 	return theText.split('.').map(sentence => [sentence, parser(sentence)] )
// 							.forEach( ([sent, words], sentenceNumber) => {

		

// 		let thisSentence = words.taggedWords

// 		thisSentence = thisSentence.map(word => word.token) 

// 		for(let j = 0; j < thisSentence.length; j++){

// 			let otherConceptsInSentence = thisSentence.filter(word => word !== thisSentence[j])

// 			for(let k = 0; k < otherConceptsInSentence.length; k++){

// 				// theres no edge yet between this sentence j and other concept k

// 				if (!concepts[thisSentence[j]]){

// 					concepts[thisSentence[j]] = { }

// 				}

// 				if(!concepts[thisSentence[j]][otherConceptsInSentence[k]] ){
				
// 					concepts[thisSentence[j]] = { ...concepts[thisSentence[j]], [otherConceptsInSentence[k]] : [sentenceNumber] }

// 					continue
// 				}
	
// 				// otherwise push the edge to the array

// 				concepts[thisSentence[j]][otherConceptsInSentence[k]].push(sentenceNumber) 

// 				// graphNodes.nodes[thisSentence[j]].size++

// 				// console.log('parsing the sentences', sentenceNumber, thisSentence[j], otherConceptsInSentence[k] )

// 			}
// 		}
// 	})
// }

// pageParser(text)

let graphNodes = {

	nodes: [],
	links: []
}

let concepts = {}

function convertToGraph(){

	// take the concepts and filter out the ones that are less connected

	// console.log('converting to graph')

	let filteredNodes = Object.entries(concepts).filter(([name, edges])=> {
		// console.log('filtering insignificant nodes: ', name)
		return Object.entries(edges).length > 50 // this filters by number of edges on each concept
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



convertToGraph()
// console.log(concepts)

// console.log( graphNodes.links.length)

fs.writeFile('fulltext.json', JSON.stringify(graphNodes), function(err){
	if (err) console.log(err)

	console.log('\n\n\n\n\n\n\n\n\n completed writing ')
})

module.exports = graphNodes

/*
{
    "nodes": [
        {
          "id": "id1",
          "name": "name1",
          "val": 1
        },
        {
          "id": "id2",
          "name": "name2",
          "val": 10
        },

    ],
    "links": [
        {
            "source": "id1",
            "target": "id2"
        },
 
    ]
}
*/

// console.log(text)

// text = text.split('')
// 			.map(word => {if(x === '.') {return ' .'} else{return x}})
// 			.join('')
// 			.split(' ')
// 			.filter(x => x.length > 10 || x === '.')
// 			.join(' ')
// console.log(text.split('.'))


/*


function parseHegel(theText){

	return theText.split('.').map(sentence => [sentence, parser(sentence)] )
							.forEach( ([sent, words], sentenceNumber) => {

		// console.log('STARTED GRAPHING \n\n\n', sentenceNumber )

		let  thisSentence  = words.taggedWords

		thisSentence = thisSentence.map(word => word.token) 

		for(let j = 0; j < thisSentence.length; j++){

			let otherConceptsInSentence = thisSentence.filter(word => word !== thisSentence[j])

			for(let k = 0; k < otherConceptsInSentence.length; k++){

				// theres no edge yet between this sentence j and other concept k

				if(!concepts[thisSentence[j]] || !concepts[thisSentence[j]][otherConceptsInSentence[k]] ){
				
					concepts[thisSentence[j]] = { ...concepts[thisSentence[j]], [otherConceptsInSentence[k]] : [sentenceNumber] }
				
					continue
				}
	
				// otherwise push the edge to the array

				concepts[thisSentence[j]][otherConceptsInSentence[k]].push(sentenceNumber) 
			
			}
		}
	})
}


*/
