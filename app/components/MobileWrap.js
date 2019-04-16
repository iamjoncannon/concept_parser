import React, { Suspense } from 'react'
import './spinnaz.css'
import Spinner from './refresh-button.svg'
import SVG from 'react-inlinesvg';

const MobileGraph = React.lazy( () => import('./graph_mobile.js'))

export default function DeskWrap (props){

  return (
    <div>
		<Suspense fallback={<Spinner className='loader'/>}>
			<MobileGraph />
		</Suspense>
    </div>
  );
};