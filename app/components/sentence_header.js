import React from 'react'
import Sentences from './sentences'

export default function SentenceHeader( props ){

    let message = "Displaying " + props.sentences.length + ' passages that contain "' + props.edges[0] + '" and "' + props.edges[1] +'"'

	return (
            <div>
            <h1> {message} </h1>
            <br />
            <Sentences sentences={props.sentences} />
            </div>
        )
        
	
}