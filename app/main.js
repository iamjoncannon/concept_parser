import React, { Suspense } from 'react'
import { render } from 'react-dom'
import { ForceGraph3D } from 'react-force-graph';
import DeskWrap from './components/DeskWrap'
import MobileWrap from './components/MobileWrap'

class Query extends React.Component {

	render(){

		return (
			<div>

				{ window.outerWidth > 700 ? <DeskWrap /> : <MobileWrap /> }
				
          	</div>
		)
	}
}


render(

 	 <Query />
 	 ,

  document.getElementById('root')
);


