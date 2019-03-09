import React from 'react'
import {render} from 'react-dom'
import { Provider} from 'react-redux'
import store from './store'
import Root from './components/root'
import { ForceGraph3D } from 'react-force-graph';
import AllCampus from './components/all_campus'
// render(
//   <Provider store={store}>
//     <Root />
//   </Provider>,
//   document.getElementById('main')
// )

render(
  <AllCampus />, 
  document.getElementById('main')
);
