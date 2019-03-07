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

    console.log(theseNodes)

    this.setState({
        nodes : JSON.parse(theseNodes.data)
    })
  }

  render () {

    return (
          this.state.nodes ? <ForceGraph3D graphData={this.state.nodes} /> : '' 
          
    )
  }
}
