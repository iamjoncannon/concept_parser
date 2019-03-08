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

const myData = {
    "nodes": [ 
        { 
          "id": "id1",
          "name": "NODE NUMERO UNO",
          "val": 1 
        },
        { 
          "id": "id2",
          "name": "NODE NUMERO DOSE",
          "val": 10
        }
    ],
    "links": [
        {
            "source": "id1",
            "target": "id2"
        }
    ]
}

render(
  <AllCampus />, 
  document.getElementById('main')
);
