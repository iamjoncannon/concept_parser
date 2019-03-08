import React from 'react'
import { ForceGraph3D } from 'react-force-graph';
import axios from 'axios'

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

    // console.log(theseNodes)

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

    return (
          this.state.nodes ? <ForceGraph3D 
                                ref={el => { this.fg = el; }}
                                graphData={this.state.nodes} 
                                onNodeClick={this._handleClick}
                                linkWidth={0}
                                linkDirectionalArrowRelPos={1}
                              /> : '' 
          
    )
  }
}
                                // linkCurvature={0.25}
