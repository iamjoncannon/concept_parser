import React from 'react'
import { ForceGraph3D } from 'react-force-graph';
import axios from 'axios'
import SpriteText from 'three-spritetext';
import 'react-dat-gui/build/react-dat-gui.css';
import DatGui, { DatFolder, DatSelect, DatBoolean, DatColor, DatNumber, DatString, DatButton } from 'react-dat-gui';
import { slide as Menu } from 'react-burger-menu'

// import { connect } from 'react-redux'
// import { axnTHUNK_GET_ALL_CAMPUS, axnTHUNK_DELETE_CAMPUS } from './../reducers/thunx'
// import { Link, withRouter } from 'react-router-dom'
// import  Student_list  from './student_list'

export default class AllCampus extends React.Component {

  constructor(){
    super()

    this.state = {
      maxNodeWeight : 22078,
      loading: 'RENDER',
      openSide : true,
      data: {
        filterType: 'Absolute density',
        package: 'react-dat-gui',
        Sections: 'Science of Logic',
        NodeDensity: 9000,
        EdgeDensity: 100,
        edgeDensityDegrees : 1,
        degreeRange: 30
      }
    }

  }

  async componentDidMount(){

    this.updateGraph(true)
  }

  handleUpdate = data => this.setState({ data })

  _handleClick = node => {
          // Aim at node from outside it
          // console.log(node)
          const distance = 40;
          const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);
          this.fg.cameraPosition(
            { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
            node, // lookAt ({ x, y, z })
            500  // ms transition duration
          );
  };
  
  updateGraph = (scene) => {

    let { NodeDensity, EdgeDensity, filterType, degreeRange, edgeDensityDegrees } = this.state.data

    let combinedQuery = `?NodeDensity=${NodeDensity}&EdgeDensity=${EdgeDensity}&filterType=${filterType}&degreeRange=${degreeRange}&edgeDensityDegrees=${edgeDensityDegrees}`

    axios.get(`/api/hegel/data/${combinedQuery}`).then(theseNodes => 

      this.setState({
        nodes : JSON.parse(theseNodes.data),
        openSide: scene,
        loading: 'RENDER'
      })

      )

    this.setState({
        loading: '...loading'
      })
  }

  linkColor = (weight) => {

  }

  showSettings (event) {
    event.preventDefault();
  }

  isMenuOpen = (state) => {

    this.setState({
      openSide : state.isOpen
    })

  };

  _handleLinkHover = (link, prevLink) => {

    if(link === null){
      prevLink.name = ''
    }
    else{
      link.name = link.source.name + " => " + link.target.name
    }

  }

  render () {

    return (
      <div id="App">
          <Menu pageWrapId={"page-wrap"} 
                outerContainerId={"App"}
                width={ '30%' }
                isOpen={ this.state.openSide }
                onStateChange={ this.isMenuOpen }
          >
            <div>
            <span> </span>
            <span> Hegel's Science of Logic, rendered as a graph.  </span> <br /><br />
            <span> Node's refer to concepts, edges refer to connections between concepts in use.  </span> <br /><br />
            <span> Nodes can be filtered either absolutely (by frequency) or relatively (the frequency of their edge pairs). </span> <br /><br />
            <span> Edges can be filtered by weight (frequency). </span> <br /><br />
            <span> Edge weights can be measured in up to three degrees </span> <br /><br />
            <span> Click on an edge to query the passages that contain that edge pair, sorted by the relative importance of the passage </span>
            </div>
            {/*
            <a id="home" className="menu-item" href="/">Home</a>
            <a id="about" className="menu-item" href="/about">About</a>
            <a id="contact" className="menu-item" href="/contact">Contact</a>
            */}
           { /* <a onClick={ this.showSettings } className="menu-item--small" href="/">Settings</a> */}
         </Menu>
        
        <div id="page-wrap">
          { this.state.nodes ? <ForceGraph3D
                                ref={el => { this.fg = el; }}
                                graphData={this.state.nodes}
                                linkWidth={.5}
                                linkAutoColorBy={d => console.log(d)}
                                onLinkClick={(link)=>console.log(link)}
                                onLinkHover={this._handleLinkHover}
                                onNodeClick={this._handleClick}
                                nodeThreeObject={node => {
                                 
                                  const sprite = new SpriteText(node.name);
                                  sprite.textHeight = 15 * (node.weight / this.state.maxNodeWeight);
                                  return sprite;
                                }}
                                
                              /> : 'LOADING' }
          <DatGui data={this.state.data} onUpdate={this.handleUpdate}>
            <DatSelect path='filterType' label="Node Filter" options={['Absolute density', 'Relative density']} /> 
            <DatNumber path='NodeDensity' label='Node Density' min={300} max={10000} step={1} />
            <DatSelect path='edgeDensityDegrees' label="Edge Degrees" options={['1', '2', '3']} /> 
            <DatNumber path='degreeRange' label='Degree Range' min={1} max={100} step={1} />
            <DatNumber path='EdgeDensity' label='Edge Density' min={1} max={150} step={1} />
            <DatButton label={this.state.loading} onClick={()=> this.state.loading === 'RENDER' ? this.updateGraph(false) : ''  } />
          </DatGui> 
        </div>
      </div>
    )
  }
}
                                  // sprite.color = node.color;
            // <DatString path='package' label='Package' />
                                // linkCurvature={0.25}
            // <DatBoolean path='isAwesome' label='Awesome?' />
            // <DatColor path='feelsLike' label='Feels Like' />

/*

<ForceGraph3D 
                                
                                graphData={this.state.nodes} 
                                
                                linkWidth={0}
                                linkDirectionalArrowRelPos={1}
                              /> : '' 

*/