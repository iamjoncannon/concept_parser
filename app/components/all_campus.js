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
        filterType: '',
        package: 'react-dat-gui',
        Sections: 'Science of Logic',
        NodeDensity: 9000,
        EdgeDensity: 100,
        isAwesome: true,
        feelsLike: '#2FA1D6',
      }
    }

  }

  async componentDidMount(){

    let combinedQuery = `?NodeDensity=${this.state.data.NodeDensity}&EdgeDensity=${this.state.data.EdgeDensity}`
    
    const theseNodes = await axios.get(`/api/hegel/data/${combinedQuery}`)

    // console.log(theseNodes.data)

    this.setState({
        nodes : JSON.parse(theseNodes.data),
        openSide: true
    })
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
            1000  // ms transition duration
          );
  };
  
  updateGraph = (data) => {

    let combinedQuery = `?NodeDensity=${this.state.data.NodeDensity}&EdgeDensity=${this.state.data.EdgeDensity}`

    axios.get(`/api/hegel/data/${combinedQuery}`).then(theseNodes => 

      this.setState({
        nodes : JSON.parse(theseNodes.data),
        openSide: false,
        loading: 'RENDER'
      })

      )

    this.setState({
        loading: '...loading'
      })
    // console.log(theseNodes.data)


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

  render () {

    return (
      <div id="App">
          <Menu pageWrapId={"page-wrap"} 
                outerContainerId={"App"}
                width={ '30%' }
                isOpen={ this.state.openSide }
                onStateChange={ this.isMenuOpen }
          >
            {/*
            <a id="home" className="menu-item" href="/">Home</a>
            <a id="about" className="menu-item" href="/about">About</a>
            <a id="contact" className="menu-item" href="/contact">Contact</a>
            */}
           {/*} <a onClick={ this.showSettings } className="menu-item--small" href="/">Settings</a> */}
         </Menu>
        
        <div id="page-wrap">
          { this.state.nodes ? <ForceGraph3D
                                ref={el => { this.fg = el; }}
                                graphData={this.state.nodes}
                                linkWidth={0}
                                linkAutoColorBy={d => console.log(d)}
                                onLinkClick={(link)=>console.log(link)}
                                onNodeClick={this._handleClick}
                                nodeThreeObject={node => {
                                 
                                  const sprite = new SpriteText(node.name);
                                  sprite.textHeight = 15 * (node.weight / this.state.maxNodeWeight);
                                  return sprite;
                                }}
                                
                              /> : 'LOADING' }
          <DatGui data={this.state.data} onUpdate={this.handleUpdate}>
            <DatSelect path='FilterType' label="Node Filter" options={['Absolute density', 'Relative density']} /> 
            <DatNumber path='NodeDensity' label='Node Density' min={300} max={10000} step={1} />
            <DatNumber path='EdgeDensity' label='Edge Density' min={1} max={150} step={1} />
            <DatButton label={this.state.loading} onClick={()=> this.state.loading === 'RENDER' ? this.updateGraph(this.state.data.NodeDensity) : ''  } />
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