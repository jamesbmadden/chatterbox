import React, { useState } from 'react';

import logo from './logo.svg';
import './App.css';

import Spotify from './Logic/spotify';
import Signin from './Pages/Signin.js';
import Home from './Pages/Home.js';

import SpeechRecog from './SpeechRecognition';

const spotify = new Spotify();

function App() {

  const [ update, setUpdate ] = useState(0);

  spotify.updateApp = () => {
    setUpdate(update + 1);
  }

  if (spotify.loggedIn) return <Home spotify={spotify} update={update}></Home>;
  else return <Signin getLoginHref={() => spotify.getLoginHref()}></Signin>;
}

export default App;
