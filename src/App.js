import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation'; //.js by default
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';
import  Clarifai from 'clarifai';
import './App.css';

//https://docs.clarifai.com/api-guide/api-overview/api-clients
//npm install clarifai
const app = new Clarifai.App({
 apiKey: '363956b692bf4fbe973771a7c29ff825'
});
/*https://www.npmjs.com/package/react-particles-js */
const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 200
      }
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  calculateFaceLocation = (data) => {
    const clarifyFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifyFace.left_col * width,
      topRow: clarifyFace.top_row * height,
      rightCol: width - (clarifyFace.right_col * width),
      bottomRow: height - (clarifyFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
    console.log(box);
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    /*https://www.clarifai.com/models/face-detection-image-recognition-model-a403429f2ddf4b49b307e318f00e528b-detectionhttps://www.clarifai.com/models/face-detection-image-recognition-model-a403429f2ddf4b49b307e318f00e528b-detectionhttps://www.clarifai.com/models/face-detection-image-recognition-model-a403429f2ddf4b49b307e318f00e528b-detectionhttps://www.clarifai.com/models/face-detection-image-recognition-model-a403429f2ddf4b49b307e318f00e528b-detection*/
    app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input
    )
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    //console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
    // do something with response
    .catch(error => console.log('err'));
  }

  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState({isSignedIn: false});
    } else if(route === 'home') {
      this.setState({isSignedIn: true});
    }
    this.setState({route: route}); //in curly brackets bec its an object
  }

  render() {
    const { isSignedIn,imageUrl, route, box } = this.state;
    return (
      <div>
        <Particles className='particles'
          params={particlesOptions} 
        />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />             
        { route === 'home' 
          //{telling its a javascript expression for using if
          //returning multiple elements doesnt work, we need to wrap them in div, below
          ? <div>        
            <Logo />
            <Rank />
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
            <FaceRecognition box = {box} imageUrl={imageUrl}/>
          </div>
          : this.state.route === 'signin'
          ? <Signin onRouteChange={this.onRouteChange}/>
          : <Register onRouteChange={this.onRouteChange}/>
        }
      </div>
    );
  }
}

export default App;
