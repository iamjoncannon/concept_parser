import React, { useState } from 'react'
import { render } from 'react-dom'
// import { Provider} from 'react-redux'
// import store from './store'
// import Root from './components/root'
import { ForceGraph3D } from 'react-force-graph';
import AllCampus from './components/all_campus'

import Wrapper from './components/wrapper'

// console.dir(useState)

// render(
//   <Provider store={store}>
//     <Root />
//   </Provider>,
//   document.getElementById('main')
// )

render(
	<Wrapper>
 	 <AllCampus />
  </Wrapper>,
  document.getElementById('main')
);
