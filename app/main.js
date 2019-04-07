import React, { useState } from 'react'
import { render } from 'react-dom'
import { ForceGraph3D } from 'react-force-graph';
import Graph from './components/graph'

import Wrapper from './components/wrapper'

render(
 	 <Graph />,
  document.getElementById('main')
);
