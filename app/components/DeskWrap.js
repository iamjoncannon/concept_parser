import React, { Suspense } from 'react'
import './spinnaz.css'
import Spinner from './refresh-button.svg'
import SVG from 'react-inlinesvg';

const DesktopGraph = React.lazy( () => import('./graph'))

export default function DeskWrap (props){

  return (
    <div>
		<Suspense fallback={<Spinner className='loader'/>}>
			<DesktopGraph />
		</Suspense>
    </div>
  );
};