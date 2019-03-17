import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Particles from 'react-particles-js';
import * as serviceWorker from './serviceWorker';

const particlesParams = {
  particles: {
    number:{
        value: 80,
        density:{
        enable:true,
        value_area:800
        }
    }
	}
}

ReactDOM.render(
  <div>
    <Particles params ={particlesParams} className='particles'/>
    <App />
  </div>, document.getElementById('root'));

serviceWorker.unregister();
