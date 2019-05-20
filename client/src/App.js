import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognitioin from './components/FaceRecognition/FaceRecognition';
import './App.css';

const app = new Clarifai.App({
  apiKey: 'f0315d67b9534416985f9380f1ac8963'
});

const particlesOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {
  state = {
    urlInput: '',
    imageUrl: '',
    box: {},
    route: 'signin',
    isSignedIn: false
  }

  faceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);

    const faceBox = {
      topRow: clarifaiFace.top_row * height,
      leftCol: clarifaiFace.left_col * width,
      bottomRow: height - (clarifaiFace.bottom_row * height),
      rightCol: width - (clarifaiFace.right_col * width)
    }
    this.setState({ box: faceBox });
  }

  onInputChange = e => {
    // console.log(e.target.value);
    this.setState({ urlInput: e.target.value });
  }

  onButtonDetect = e => {
    // console.log('Click');
    this.setState({ imageUrl: this.state.urlInput });
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.urlInput)
      .then((res) => {
        // console.log(res);
        this.faceLocation(res)
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if ( route === 'signout') {
      this.setState({ isSignedIn: false});
    } else if ( route === 'home') {
      this.setState({ isSignedIn: true});
    }
    this.setState({ route: route });
  }

  render() {
    const { route, isSignedIn, box, imageUrl } = this.state;
    return (
      <div className="App">
        <Particles
          className='particles'
          params={particlesOptions}
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home'
          ? <div>
              <Logo />
              <Rank />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonDetect={this.onButtonDetect}
              />
              <FaceRecognitioin box={box} imageUrl={imageUrl} />
          </div>
          : (
            route === 'signin'
              ? <Signin onRouteChange={this.onRouteChange} />
              : <Register onRouteChange={this.onRouteChange} />
          )
        }
      </div>
    );
  }
}

export default App;