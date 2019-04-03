import React from 'react'

export default function spiel(){

	return (

		<div>
            <i>
            <span> </span>
            <span> <h1> Hegel's  Science of Logic, rendered as a graph.</h1>  </span>
            <span> Node's refer to concepts, edges refer to connections between concepts in use.  </span> <br /><br />
            <span> Nodes can be filtered either absolutely (by frequency) or relatively (the frequency of their edge pairs). </span> <br /><br />
            <span> Edges can be filtered by weight (frequency). </span> <br /><br />
            <span> Edge weights can be measured in up to three degrees </span> <br /><br />
            <span> Click on an edge to query the passages that contain that edge pair, sorted by the relative importance of the passage </span>
            </i>
        </div>
	)
}