// console.clear()

const natural = require("natural");
const path = require("path");
let fs = require('fs')

const base_folder = path.join(path.dirname(require.resolve("natural")), "brill_pos_tagger");
const rulesFilename = base_folder + "/data/English/tr_from_posjs.txt";
const lexiconFilename = base_folder + "/data/English/lexicon_from_posjs.json";
const defaultCategory = 'N';
const lexicon = new natural.Lexicon(lexiconFilename, defaultCategory);
const rules = new natural.RuleSet(rulesFilename);
const tagger = new natural.BrillPOSTagger(lexicon, rules);

let text

try {
	text = fs.readFileSync('./Hegel-TheScienceofLogic.txt', 'utf8');	
	// text = fs.readFileSync('./firstchapter.txt', 'utf8');	
}
catch(err){
	console.log(err)
}

const parser = (inputText) => {

	console.log("parsing: \n", inputText)

	output = inputText.replace(/[.,\/#!$%\^&\*;:{}=\_`~()0-9\n]/g,"")

	let tagged = tagger.tag(output.split(' '))

	let treebank = 'N' || 'NN' || 'JJ'

	tagged.taggedWords = tagged.taggedWords.filter(x => x.tag === 'N' || x.tag === 'NN' || x.tag === 'JJ').filter(x => x.token.length > 4)

	return tagged
}

let graphNodes = {

	nodes: [],
	links: []
}

let concepts = {}

function pageParser(theText){

	return theText.split('.').map(sentence => [sentence, parser(sentence)] )
							.forEach( ([sent, words], sentenceNumber) => {

		// console.log('STARTED GRAPHING \n\n\n', sent, words )

		let thisSentence = words.taggedWords

		thisSentence = thisSentence.map(word => word.token) 

		for(let j = 0; j < thisSentence.length; j++){

			let otherConceptsInSentence = thisSentence.filter(word => word !== thisSentence[j])

			for(let k = 0; k < otherConceptsInSentence.length; k++){

				// theres no edge yet between this sentence j and other concept k

				if (!concepts[thisSentence[j]]){

					concepts[thisSentence[j]] = { }

				}

				if(!concepts[thisSentence[j]][otherConceptsInSentence[k]] ){
				
					concepts[thisSentence[j]] = { ...concepts[thisSentence[j]], [otherConceptsInSentence[k]] : [sentenceNumber] }

					continue
				}
	
				// otherwise push the edge to the array

				concepts[thisSentence[j]][otherConceptsInSentence[k]].push(sentenceNumber) 

				// graphNodes.nodes[thisSentence[j]].size++

			

			}
		}
	})
}

pageParser(text)

function convertToGraph(){

	// take the concepts and filter out the ones that are less connected

	let filteredNodes = Object.entries(concepts).filter(([name, edges])=> {
	
		return Object.entries(edges).length > 1000 // this filters by number of edges on each concept
	})

	// make a copy of the array array back into a new reference object to perform a lookup

	let referenceCopy = filteredNodes.slice().reduce((a,b) => {
		// console.log(b)
		return {...a, [b[0]] : b[1]}
	}, {})

	// console.log(referenceCopy['knowledge'])
	
	// iterate over each set of edges and delete the edge entries that themselves
	// are not in the reference copy
	// in other words, we only want the edges that themselves are dense

	let theseNodes = filteredNodes.map(([name, edges]) => {

		// console.log(Object.entries(edges))
		let newEdges = Object.entries(edges).filter(edge => referenceCopy[edge[0]]).reduce((a,b) => {
			// console.log(b)
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

	for (let i = 0; i < theseNodes.length; i++){

		let nodeName = theseNodes[i][0];

		let nodeEdges = theseNodes[i][1]

		let edgeSize = Object.entries(nodeEdges).length

		let newNode = {
						id : nodeName,
						name : nodeName,
						desc : nodeName,
					}


		graphNodes.nodes.push(newNode)

		for (let k = 0; k < Object.entries(nodeEdges).length; k++){

			graphNodes.links.push({
				source: theseNodes[i][0],
				target : Object.entries(nodeEdges)[k][0]
			})
		
		}	

		
	}
	
}

convertToGraph()
// console.log(concepts)

// console.log( graphNodes)

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
