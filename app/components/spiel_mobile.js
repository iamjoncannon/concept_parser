import React from 'react'

export default function spiel(props){

    console.log(props)

	return (

		<div id='mobileSpiel' onClick={props.onClick}>
            <i>

            <span> <h1> ***Note- for a full version of the web app, please view on a desktop browser*** </h1> </span> 
            <span> <h1> This project renders concepts within a text as a graph. The present example is GWF Hegel's Science of Logic </h1> </span> 
            <span> <h1> Node's refer to concepts, edges refer to connections between concepts in use.  </h1> </span> 
            <span> <h1> See <a href='https://www.youtube.com/watch?v=sPflAhvZgrU'> presentation </a> </h1> </span> 
            </i>
        </div>
	)
}