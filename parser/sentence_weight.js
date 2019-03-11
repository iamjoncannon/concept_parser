const { Sentence, Concept, Edge } = require('./../server/db/index')
const parser = require('./nlp')

async function sentenceWeight(thisSentence){

	thisSentence.content.split('.').map(sentence => [sentence, parser(sentence)] )
							.forEach( async ([sent, words], sentenceNumber) => {
	
	let sentence = words.taggedWords

	sentence = sentence.map(word => word.token) 


		let sentenceWeight = 0

		for(let j = 0; j < sentence.length; j++){

			let concept

			try{
				concept = await Concept.findOne({
					where : {
						name : sentence[j]
					}
				})

			// console.log('here is the ', concept)
				if(concept){
					sentenceWeight += concept.relativeweight
				}
			}
			catch(err){
				console.log(err)
			}

			// console.log(sentenceWeight)
		}

		try{

			let result = await thisSentence.update({
				weight: sentenceWeight
			})

			console.log(result)


		}
		catch(err){
			console.log(err)
		}



	})


}

module.exports = sentenceWeight
