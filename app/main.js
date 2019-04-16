import React, { useState } from 'react'
import { render } from 'react-dom'
import { ForceGraph3D } from 'react-force-graph';
import Graph from './components/graph'
import MobileGraph from './components/graph_mobile.js'
import Media from 'react-media'


class Query extends React.Component {

	render(){
		return (
			<div>
				<Media
	            query="(min-width: 700px)"
	            render={() => {
	              	return(

						<Graph />
					) 
	            	}}
	          	/>
	          	<Media
	            query="(max-width: 699px)"
	            render={() => {
	              	return(

						<MobileGraph />
					) 
	            	}}
	          	/>
          	</div>
		)
	}
}


render(

 	 <Query />,

  document.getElementById('main')
);


