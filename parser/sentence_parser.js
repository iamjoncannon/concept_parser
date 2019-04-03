// this file will iterate through each sentence and generate 
// concept nodes with the sentence ID

const { Sentence, Concept, Edge, Weight } = require('./../server/db/index')

const parser = require('./nlp')

async function sentenceParser(theText){

	let sentenceId = theText.id

	// console.log(theText.content)

	theText.content.split('.').map(sentence => [sentence, parser(sentence)] )
							.forEach( async ([sent, words], sentenceNumber) => {
	
		let thisSentence = words.taggedWords

		thisSentence = thisSentence.map(word => word.token) 

		// console.log(thisSentence)

		// within each sentence, we iterate over each word and 
		// find or create create a concept, as well as create an edge for each to each other
		
		let pointer = 0;

		for(let j = 0; j < thisSentence.length; j++){

			// find or create the source concept

			let theSource

			try{
				theSource = await Concept.findOrCreate({
					where : {
						name : thisSentence[j]
					}
				})
			}
			catch(err){
				console.log(err)
			}

			// console.log('name is up in the source ', theSource)

			let otherConceptsInSentence = thisSentence.filter(word => word !== thisSentence[j])


			for(let k = pointer; k < otherConceptsInSentence.length; k++){

					// find or create the target concept
					let theTarget
					let dummyId

					try {		
						theTarget = await Concept.findOrCreate({
							where : {
								name : otherConceptsInSentence[k]
							}
						})


					}
					catch(err){
						console.log(err)
					}

					// use the id of each concept to create the edge
					// first find 

					let edgy

					try {

						edgy = await Edge.create({

								locationId : sentenceId,
								sourceId : theSource[0].id,
								targetId : theTarget[0].id	
						})
						console.log('heres the edge: ', edgy)
					}
					catch(err){
						console.log(err)
					}

				if(pointer === otherConceptsInSentence.length){
					pointer = 0
					break
				}

			}

			// console.log("pointer is working: ", pointer)			
			
			pointer++			
		}
		
	})

	// console.log('sentence parsing completed')	
}

module.exports = sentenceParser