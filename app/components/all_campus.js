import React from 'react'
import { ForceGraph3D } from 'react-force-graph';
import axios from 'axios'
import SpriteText from 'three-spritetext';

// import { connect } from 'react-redux'
// import { axnTHUNK_GET_ALL_CAMPUS, axnTHUNK_DELETE_CAMPUS } from './../reducers/thunx'
// import { Link, withRouter } from 'react-router-dom'
// import  Student_list  from './student_list'

export default class AllCampus extends React.Component {

  constructor(){
    super()

    this.state = {}
  }

  async componentDidMount(){

    const theseNodes = await axios.get('/api/hegel')

    this.setState({
        nodes : JSON.parse(theseNodes.data)
    })
  }


  _handleClick = node => {
          // Aim at node from outside it
          const distance = 40;
          const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);
          this.fg.cameraPosition(
            { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
            node, // lookAt ({ x, y, z })
            1000  // ms transition duration
          );
        };
//  
  render () {

    console.dir(ForceGraph3D)

    return (
          this.state.nodes ? <ForceGraph3D
                                ref={el => { this.fg = el; }}
                                graphData={this.state.nodes}
                                onNodeClick={this._handleClick}
                                nodeAutoColorBy="group"
                                nodeThreeObject={node => {
                                  const sprite = new SpriteText(node.id);
                                  sprite.color = node.color;
                                  sprite.textHeight = 2;
                                  return sprite;
                                }}
                                linkWidth={.01}
                              /> : ''
          
    )
  }
}
                                // linkCurvature={0.25}

/*

<ForceGraph3D 
                                
                                graphData={this.state.nodes} 
                                
                                linkWidth={0}
                                linkDirectionalArrowRelPos={1}
                              /> : '' 

*/