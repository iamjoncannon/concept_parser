import React from 'react'

export default function Sentences( props ){

	return (
            props.sentences.map((sentence) => {
            return (                 
                    <ul>
                    {sentence.content}
                    <br />
                    Density: {sentence.weight}
                    </ul>
               
            )})
        
        )
        
	
}