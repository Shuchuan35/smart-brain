import React, { Component } from 'react';
import * as $ from 'axios';
import Particles from 'react-particles-js';
// import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognitioin from './components/FaceRecognition/FaceRecognition';
import './App.css';

// const app = new Clarifai.App({
//   apiKey: 'f0315d67b9534416985f9380f1ac8963'
// });

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
    boxes: [],
    route: 'signin',
    isSignedIn: false,
    user: {}
  }

  loadUser = data => {
    this.setState({ user: data });
  }

  locateFaces = (data) => {
    const regions = data.outputs[0].data.regions;
    const faceBoxes = [];

    for (let i = 0; i < regions.length; i++) {

      const clarifaiFace = regions[i].region_info.bounding_box;
      const image = document.getElementById('inputImage');
      const width = Number(image.width);
      const height = Number(image.height);

      const faceBox = {
        topRow: clarifaiFace.top_row * height,
        leftCol: clarifaiFace.left_col * width,
        bottomRow: height - (clarifaiFace.bottom_row * height),
        rightCol: width - (clarifaiFace.right_col * width)
      }

      faceBoxes.push(faceBox);

    }
    this.setState({ boxes: faceBoxes });
  }

  onInputChange = e => {
    this.setState({ urlInput: e.target.value });
  }

  onImageDetect = e => {
    this.setState({ imageUrl: this.state.urlInput });

    // app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.urlInput)
    $.post('/api/facemodel', { input: this.state.urlInput })
      .then(res => {

        $.put('/api/image', { id: this.state.user._id })
          .then(res => {
            // console.log(res);
            this.setState(Object.assign(this.state.user, { entries: res.data.entries }))
          });

        this.locateFaces(res.data);
      })
      .catch(err => console.log('unable to get face model', err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({ isSignedIn: false, urlInput: '', imageUrl: '' });
    } else if (route === 'home') {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  }

  render() {
    const { route, isSignedIn, boxes, imageUrl } = this.state;
    return (
      <div className="App">
        <Particles
          className='particles'
          params={particlesOptions}
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {route === 'home'
          ? <div>
            <Logo />
            <Rank user={this.state.user} />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onImageDetect={this.onImageDetect}
            />
            <FaceRecognitioin boxes={boxes} imageUrl={imageUrl} />
          </div>
          : (
            route === 'signin'
              ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          )
        }
      </div>
    );
  }
}

export default App;
