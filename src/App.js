import React, { Component } from 'react';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import Rank from './components/rank/Rank';
import Register from './components/register/Register'
import FaceRecognition from './components/faceRecognition/FaceRecognition';
import SignIn from './components/signIn/SignIn';
import 'tachyons';
import './App.css'

const initialState = {
  input:'',
  imageUrl: '',
  box: {},
  route:'signin',
  isSignedIn: false,

  user:{
    id:'',
    name:'',
    email:'',
    entries:0,
    joined:''
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }

  loadUser = (data) =>{
    this.setState({user:{
      id: data.id,
      name: data.name,
      email: data.email,
      entries:data.entries,
      joined:data.joined
    }});
  }

  componentDidMount(){
    fetch('http://localhost:3001')
    // .then(response => response.json())
     .then(data => console.log(data));
  }

  onChangeInput = (event) =>{
    this.setState({input:event.target.value});
  }

  calculateFaceLocation = (data) => {
    const faces = data.outputs[0].data.regions[0].region_info.bounding_box;
    const img = document.getElementById('inputimage');
    const width = Number(img.width);
    const height = Number(img.height);
    return {
       leftCol: faces.left_col*width,
       topRow: faces.top_row * height,
       rightCol: width - (faces.right_col*width),
       bottomRow: height - (faces.bottom_row*height)
    };
  }

  displayFaceBox = (box) =>{
    this.setState({ box});
  }

  onSubmiteDetect = () =>{
    this.setState({imageUrl:this.state.input});
      fetch('http://localhost:3001/imageurl',{
        method: 'post',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
          input:this.state.input,
        })
      })
      .then(response => response.json())
      .then(response => {
        if(response!=='error in api'){
          fetch('http://localhost:3001/image',{
            method: 'put',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
              id:this.state.user.id,
            })
          })
          .then(response=> response.json())
          .then(count =>{
            this.setState(Object.assign(this.state.user,{entries:count}));
          });
        }
        this.displayFaceBox(this.calculateFaceLocation(response))})
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if(route ==='signin' || route ==='register'){
      this.setState(initialState);
    }else{
      this.setState({isSignedIn:true});
    }
    this.setState({route});
  }

  render() {
    const {box,route,imageUrl,isSignedIn, user} = this.state;
      return (
        <div className="App">
          <Navigation  isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
          { route === 'home'
            ? <div>
              <Logo />
              <Rank
                name={user.name}
                entries={user.entries}/>
              <ImageLinkForm
                onChangeInput={this.onChangeInput}
                onSubmiteDetect={this.onSubmiteDetect}
              />
              <FaceRecognition box={box} imageUrl={imageUrl}/>
            </div>
            :(
              this.state.route ==='signin'
              ? <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
              : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
            )
          }
        </div>
      );
    }
  }

export default App;
