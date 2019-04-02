import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import Brain from './brain.png';
// sadsd
const Logo = () => {
  return(
    <div className='ma4 mt0'>
      <Tilt className="Tilt br2 shadow-2 tc" options={{ max : 30 }} style={{ height: 120, width: 120 }} >
       <div className="Tilt-inner pa3">
        <img style={{paddingTop:'3px'}} src={Brain} alt='logo'/>
        </div>
      </Tilt>
    </div>
  );
}

export default Logo;
