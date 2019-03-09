// this file will parse the text and create sentence rows
let fs = require('fs')

let text

const { Sentence } = require('./../server/db/index')

try {
	// text = fs.readFileSync('./Hegel-TheScienceofLogic.txt', 'utf8');	
	text = fs.readFileSync('./firstchapter.txt', 'utf8');	
}
catch(err){
	console.log(err)
}

async function pageParser(theText){

	let section = "the doctrine of being";

	text.split('.').forEach( async (sentence, i) => {

		// console.log(sentence)

		if(sentence.includes("*** HERES THE START OF THE BOOK ***")){
			
			section = "the doctrine of being"
		}

		// page 326 - doctrine of essence
		
		if(sentence.includes("*** doctrine of essence ***")){
			
			section = "doctrine of essence"
		}
		// page 489 - doctrine of the concept

		if(sentence.includes("*** doctrine of the concept ***")){
			
			section = "doctrine of the concept"
		}

		// skipping the intro and appendix sections

		// if(i < 14266 && i > 1700){

			sentence.split('\n').forEach( async (bit, ii) => {
				
				bit = bit.replace(/[�.,\/#!$%\^&\*;:{}=\_`~()0-9\n]/g,"")
				
					if(bit.length > 10 && !bit.includes("Georg Wilhelm Friedrich Hegel")){
					
							let newSentence 
					
							try {
								newSentence = await Sentence.create({ section: section, content: bit})
								
								console.log(newSentence)
							}
							catch(err){
								console.log(err)
							}
					}
			})
		// }		
	})
}

module.exports = pageParser