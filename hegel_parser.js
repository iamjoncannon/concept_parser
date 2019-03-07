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
	// text = fs.readFileSync('./Hegel-TheScienceofLogic.txt', 'utf8');	
	text = fs.readFileSync('./firstchapter.txt', 'utf8');	
}
catch(err){
	console.log(err)
}

const parser = (inputText) => {

	// console.log("parsing: \n", inputText)

	output = inputText.replace(/[.,\/#!$%\^&\*;:{}=\_`~()0-9\n]/g,"")

	let tagged = tagger.tag(output.split(' '))

	tagged.taggedWords = tagged.taggedWords.filter(x => x.tag === 'N' || x.tag === 'NN' || x.tag === 'JJ').filter(x => x.token.length > 10)

	return tagged
}

let graphNodes = {

	nodes: [],
	links: []
}

let concepts = {}
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

				if (!concepts[thisSentence[j]]){

					let newNode = {
						id : thisSentence[j],
						name : thisSentence[j],
						size : 1
					}

					graphNodes.nodes.push(newNode)

					concepts[thisSentence[j]] = { }

				}

				if(!concepts[thisSentence[j]][otherConceptsInSentence[k]] ){
				
					concepts[thisSentence[j]] = { ...concepts[thisSentence[j]], [otherConceptsInSentence[k]] : [sentenceNumber] }

					graphNodes.links.push({ 

						source: thisSentence[j],
						target: otherConceptsInSentence[k]
					})					
				
					continue
				}
	
				// otherwise push the edge to the array

				concepts[thisSentence[j]][otherConceptsInSentence[k]].push(sentenceNumber) 

				// graphNodes.nodes[thisSentence[j]].size++

				graphNodes.links.push({ 

						source: thisSentence[j],
						target: otherConceptsInSentence[k]
					})	

			}
		}
	})
}

parseHegel(text)

// console.log(graphNodes)

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

