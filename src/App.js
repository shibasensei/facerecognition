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
  faceStatus:'enter picture url',

  user:{
    id:'',
    name:'',
    email:'',
    entries:0,
    joined:'',
    isVerified: false
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
      joined:data.joined,
      isVerified: false
    }});
  }

  componentDidMount(){
    fetch('http://localhost:3001')
  }

  onChangeInput = (event) =>{
    this.setState({input:event.target.value});
  }

  checkFaceExists = (response) =>{
    console.log(response)
    if(typeof response.outputs[0].data.regions === 'undefined')
      return false
    else
      return true
  }

  calculateFaceLocation = (data) => {
    const img = document.getElementById('inputimage');
    const width = Number(img.width);
    const height = Number(img.height);
    if(typeof data.outputs[0].data.regions !== "undefined"){
      const faces = data.outputs[0].data.regions[0].region_info.bounding_box;
      return {
         leftCol: faces.left_col*width,
         topRow: faces.top_row * height,
         rightCol: width - (faces.right_col*width),
         bottomRow: height - (faces.bottom_row*height)
      };
    }else{
      return {
         leftCol: 0,
         topRow: width,
         rightCol: height,
         bottomRow: 0
      };
    }

  }

  displayFaceBox = (box) =>{
    this.setState({ box});
  }

  onSubmiteDetect = () =>{
    this.setState({faceStatus:''});
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
          switch (response) {
            case 'error in api':
              this.setState({faceStatus:'error in api. sorry'});
              break;
            case 'no pic found':
              this.setState({faceStatus:'no pic found. check url'});
              break;
            default:
              if(this.checkFaceExists(response)){
                fetch('http://localhost:3001/image',{
                  method: 'put',
                  headers: {'Content-Type' : 'application/json'},
                  body: JSON.stringify({
                    id:this.state.user.id,
                  })
                })
                .then(response=> response.json())
                .then(count =>{
                  this.setState({faceStatus:'face detected'});
                  this.setState(Object.assign(this.state.user,{entries:count}));
                });
              }else{
                this.setState({faceStatus:'no face detected'});
              }
              this.displayFaceBox(this.calculateFaceLocation(response))
          }
        })
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
    const {box,route,imageUrl,isSignedIn, user, faceStatus} = this.state;
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
              <FaceRecognition
                box={box}
                imageUrl={imageUrl}
                faceStatus={faceStatus}
              />
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
