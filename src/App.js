import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import 'tachyons';
import './App.css'

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

class App extends Component {
  constructor(){
    super();
    this.state = {
      input:'',
    }
  }

  onChangeInput = (event) =>{
    console.log(event.target.value);
  }

  onSubmiteDetect = () =>{
    console.log('click ');
  }
  render() {
    return (
      <div className="App">
        <Particles params ={particlesParams} className='particles'/>
        <Navigation />
         <Logo />
         <Rank />
         <ImageLinkForm onChangeInput={this.onChangeInput} onSubmiteDetect={this.onSubmiteDetect}/>
         {/* <FaceRecognition> */}
      </div>
    );
  }
}

export default App;
