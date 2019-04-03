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

const parser = (inputText) => {

	// console.log("parsing: \n", inputText)

	output = inputText.replace(/[.,\/#!$%\^&\*;:{}=\_`~()0-9\n]/g,"")

	let tagged = tagger.tag(output.split(' '))

	let treebank = 'N' || 'NN' || 'JJ'

	// filter any phrase without a verb

	// x.tag === 'VB'

	tagged.taggedWords = tagged.taggedWords.filter(x => x.tag === 'N' || x.tag === 'NN' || x.tag === 'JJ').filter(x => x.token.length > 4)

	return tagged
}

module.exports = parser 