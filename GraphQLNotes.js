/*

https://medium.com/open-graphql/implementing-search-in-graphql-11d5f71f179

https://medium.com/infocentric/setup-a-graphql-api-with-apollo-2-0-sequelize-and-express-js-608d1365d776

Why should I care about GraphQL?

what problem is it designed to solve?

	- inefficient and imprecise resolution 
	  to API service requests (engineering problems)
	  	
	  	- over-fetching: an endpoint sending more 
	  	  data than is required (a table or model
	  	  returning columns that are not required by 
	  	  the consumer application)

	  	- multi-fetching: the data consumer needing
	  	  to send multiple requests to service the
	  	  front end application, either multiple requests
	  	  to the same endpoint (multiple rows in one table), 
	  	  or requests to multiple endpoints (multiple tables)

	- difficulty traversing large data architectures

	  	- how do you reason about pulling data from
	  	  hundreds of separate relational databases?

	  	- naive solutions are inefficient and also probably
	  	  overly verbose- fetching data from dozens of sources
	  	  and then imperatively writing logic to sort 
	  	  the data as required for presentation- you don't want
	  	  dozens of people doing this all in their own way 
	  	  (the devops problem)

so... how do
you make these traversals more efficient without
sacrificing code readability, how do you make
the processes to service these large or sprawling 
data requests as normalized and uniform as possible
for large teams?

GraphQL exposes a query protocol to
efficiently and precisely service data requests
from a large network of databases. it allows
large teams to write this servicing logic in a streamlined
and normalized fashion, with the consumer of the data
on the front end able to query on the database network 
both precisely and declaratively

how does it solve this problem?

	- the GraphQL schema maps over the underlying database and 
	  captures methods of operating on that underlying database,
	  encapsulating the logic of specifying and filtering composite
	  HTTP requests
	- it does this by explicitly operating on a network of databases
	  or data sources as a network, that is, as a network of graph nodes

what would be a good use case for this?

"you want to extract a precise cross section of data from a series
of APIs, without having to do any imperative filtering"

	- you have a large feature set which requires fluid and composite data
	  to be serviced from a large number of tables, and/or a large
	  number of specific API databases (the engineering case)
	- you have a large team of developers, and having each developer,
	  or teams on specific sections of the stack, writing separate sets
	  of logic to resolve composite data queries will start to create
	  technical debt. you want transparency in this 
	  layer of the stack. (the devops case)

What would be a bad use case for this?

	- you have a specific set of requests that are going to be made,
	  which are not going to change, and which are only retrieving
	  data from one or a few APIs 
	- GraphQL would be adding a layer of complexity to the application
	  without adding any value to the overall efficiency (overoptimization)

what is the case for using GraphQL in my application


what is my application doing

elevator pitch version- using modern data analysis and data visualization
to examine a notoriously opaque text in Western philosophy

parsing and storing thousands of nodes, which represent concepts in SOL

>> structure of the application <<

goal is to be fine tuning analysis by the end 

1. parser layer- this could be presented as feature for uploading external texts

	MVP
		- extracts concepts from each sentence and the connections between
		  concepts in each sentence
		- provides data in a format that can be stored in the API and then 
		  queried by the front end
		- stores reference to the sentence itself on concept node, and page number 
		  as a property of the sentence

	what sorts of analysis do i want to perform

	the ultimate goal: 

		- represent the concepts and have fields to filter an analyze them
		- key fields:

			- edge density- the number of connections that concept has to 
			  other concepts
			- frequency- the number of times the concept was used
			- proximity value- proximity or connections to other
			  highly dense nodes
			- section of the book it appears in (page and section)
			- separate side where the sentence for each edge is available

		- filters available

			- edge density- conceptual links- slider with all or some - 
			- frequency- sentence count - slider with all or some - 
			- relative or derived importance (think of a better word)
			  "relative centrality" 
			- section ("the most important concepts in this section or
						the most important concepts in the whole book")


entities- concept, sentence, page

	wish list

		- feature on the website

	strategy
	
		- parse the entire book and store each sentence with an ID in a sentence table
	
		- systematically traverse the sentence database and generate concept nodes from 
		  each, storing the sentence foreign key in each node

		roadmap

			PARSING

			- convert the entire book into a huge array of sentences - split(".")
			
			- data cleaning: fix the sentences so that, at each array index that is a page number, the following
			  index will join with the previous ["hahasdfsda"] "45" ["ahsdfhasd"] => ["hahasdfsdaahsdfhasd"] ["45"]
				 
			( could potentially separate this step and write a file with a huge JSON to verify data cleaning )

			- iterate over all sentences

				- store the sentence with content, the page number, derived section (from the page), and then use the id
				  to store with each of its concepts 

				- doing natural language processing- process nouns in the sentence
				  ( experiment with running verbs through a trie filter based on the book's index )

				- iterate through the nouns and process as concepts in the concept model, findorcreate where
				  name = concept name and append distribution field to include the sentenceId

				  	push the conceptIds to a temp array so the edges can be stored by conceptid 
				  	
				  	- instance method- concept.addEdges(  )

				  		- call with array of other nouns in sentence
				  		- addEdges accesses edges property and either creates an entry
				  		  in the object, or appends the sentence id to that edge's 
				  		  entry at the key

			PROCESSING DATA

			- after sentences and concepts have all been stored, can derive some values from
			  the data

			- define a model method to iterate over every value in the concepts and generate 
			  derived data values. these can actually just be in a separate processer.js file, 
			  kind of like seed except the logic for processing is housed and then run once

			  	have to get the density of all nodes before can derive each node's centrality

			  	Concept.getDensity = async () => {

						let total = await Concept.findall() // the entire concept list
						
						total.forEach((concept)=>{
								concept density is the length of the node's distribution array
								console.log(concept.name) // so i can see the progress
						})


			  	}
			
				Concept.getCentrality = async () => {
	
						let total = await Concept.findall() // the entire concept list again

						total.forEach((concept)=>{
								
								let sum; // this is our centrality measure

										// get an array of this node's edges			
								let { edges } = await concept.findbyId(concept.id)

								edges.forEach((edge)=>{

											// density of this edge
									let { density } = await concept.findbyid(edge.id)

									sum += density			
								})

								concept.centrality = sum

								concept.save()
						})
				}

				Sentence.getCentrality = async () => {
	
						let total = await Sentence.findAll()

						total.forEach((sentence)=>{
								
								let sum; // this is our centrality measure

										// get an array of this sentences's concepts			
								let { concepts } = await sentence.findbyId(sentence.id)

								concepts.forEach((concept)=>{

											// density of this edge
									let { centrality } = await Concept.findbyid(concept.id)

									sum += centrality			
								})

								sentence.centrality = sum

								sentence.save()
						})
				}

			DISPLAYING DATA

				- so at this point i should have a bunch of data in a postgres database
				- concepts with edges and data points, as well as a sentence endpoint that can be 
				  called to display each sentence
				elements of 











	what do the models actually look like

		sentence
			- content: text
			- page: integer
			- section: derived from page statically
			- concepts: array of concepts contained in the sentence (stored by foreign key)
			- centrality: sum of the centrality score of the concepts in the sentence

		concept (vertices of the graph)
			- name 
			- distribution: array of sentenceids (does this need to be here?)
			- edges: object with conceptids that are linked to the concept- key is other concept, property is 
			  array of other sentenceids, ie the other concept and the sentences where they were found together   
			- density/frequency: number of edges - can derive from Object.entries(edges) then summing each entry 
			- centrality: sum of the density of the other edges





2. storage layer-

	MVP 
		- postgres data service (Heroku will probably work) - 

3. data servicing layer-

	is a dedicated query resolution (GraphQL) required? 
	if the sentences are stored in a separate database, can simply call
	the sentence endpoint multiple times

	GraphQL adds value by optimizing the process of querying multiple rows?

	how would I do this in Sequelize?
		- findAll where edge density or frequency or derived importance is xyz
		- ship the entire object or part of the object back to the front end
		- convert the row into the d3 library's format and render

4. presentation layer- 
	
	- React ( will make an audible with Redux)
	- D3 force graph
	- material UI






*/
