import React from 'react'
import { ForceGraph3D } from 'react-force-graph';
import axios from 'axios'
import SpriteText from 'three-spritetext';
import 'react-dat-gui/build/react-dat-gui.css';
import DatGui, { DatFolder, DatSelect, DatBoolean, DatColor, DatNumber, DatString, DatButton } from 'react-dat-gui';
import { slide as Menu } from 'react-burger-menu'
import Spiel from './spiel_mobile'
import SentenceHeader from './sentence_header'
import init from './init.json'
import Media from 'react-media'

let count = 0;  

export default class Graph extends React.Component {

  constructor(){
    super()

    this.state = {
      resize: false,
      maxNodeWeight : 22078,
      loading: 'RENDER',
      openSide : true,
      scene : 'opening',
      sentences: [],
      edges: [],
      data: {
        filterType: 'Absolute density',
        package: 'react-dat-gui',
        Sections: 'Science of Logic',
        NodeDensity: 3000,
        EdgeDensity: 50,
        edgeDensityDegrees : 3,
        degreeRange: 30
      }
    }
  }

  resize = () => {

    window.location.reload()
  }

  componentDidMount = async () => {

    window.addEventListener("resize", ()=> {this.resize()});

    this.setState({
        nodes : init,
        openSide: true,
        loading: 'RENDER'
      })

  }

  componentWillUnmount() {
    window.removeEventListener("resize");
  }

  handleUpdate = data => this.setState({ data })

  _handleClick = (node, distance) => {

          // Aim at node from outside it
        
          
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

  showSettings (event) {
    event.preventDefault();
  }

  isMenuOpen = (state) => {

    console.log('state ', state)

    if(count === 1){
      
      const node = {
        x: 6.380699007330318,
        y: -7.6215317598632595,
        z: -3.8883653785341386
      }

      this._handleClick(node, 200)
    }

    count++



    this.setState({
      openSide : state.isOpen
    })

  };

  _handleLinkClick = (link) => {

    let nextScene

    this.state.scene = 'opening' ? nextScene = 'first' : nextScene = 'main'

    let combinedQuery = `?source=${link.source.id}&target=${link.target.id}`

    axios.get(`/api/hegel/data/sentences/${combinedQuery}`).then(sentences => 

      this.setState({
        sentences : JSON.parse(sentences.data),
        openSide: true,
        scene: nextScene,
        loading: 'RENDER',
        edges: [link.source.name, link.target.name]
      })

      )

    this.setState({
        loading: '...loading'
      })

  }

  _handleLinkHover = (link, prevLink) => {

    if(link === null){
      prevLink.name = ''
    }
    else{
      link.name = link.source.name + " => " + link.target.name
    }

  }

  closeSpiel = (state) => {
  
    this.setState({
      scene : 'closed'
    })
    this.isMenuOpen(state)
  }

  render () {
    
    return (
      <div id="App">

          <Menu pageWrapId={"page-wrap"} 
                outerContainerId={"App"}
                width={ '70%' }
                isOpen={ this.state.openSide }
                onStateChange={ this.isMenuOpen }
          >
            { this.state.scene === 'opening'  ? <Spiel  onClick={() => this.closeSpiel({isOpen:false}) }/>  : ''}
            
          </Menu>
        
        <div id="page-wrap">

          { this.state.nodes ? <ForceGraph3D
                                ref={el => { this.fg = el; }}
                                graphData={this.state.nodes}
                                linkWidth={.5}
                                onLinkClick={this._handleLinkClick}
                                onLinkHover={this._handleLinkHover}
                                onNodeClick={(node) =>{this._handleClick(node, 40)}}
                                nodeThreeObject={node => {
                                 
                                  const sprite = new SpriteText(node.name);
                                  sprite.textHeight = 15 * (node.weight / this.state.maxNodeWeight);
                                  return sprite;
                                }}
                                
                              /> : 'LOADING' }
        </div>
      </div>
    )
  }
}
