import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png';
import './Logo.css';

const Logo = () => {
	return (
		/*npm install --save react-tilt*/
		<div className='ma4 mt0'> 
		<Tilt className="Tilt br2 shadow-2" 
		options={{ max : 55 }} 
		style={{ height: 100, width: 100 }} >
		<div className="Tilt-inner pa3">
		<img style = {{paddingTop: '3px'}}alt='Logo' src={brain} /> 
		{/*https://icons8.com/icons/set/brain*/}
		</div>
		</Tilt>
		</div>
	);
}
export default Logo;