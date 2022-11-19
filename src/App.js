import logo from './logo.svg';
import './App.css';

import Spotify from './Logic/spotify';
import Signin from './Pages/Signin.js';
import Home from './Pages/Home.js';

import SpeechRecog from './SpeechRecognition';

const spotify = new Spotify();

function App() {
  if (spotify.loggedIn) return <Home></Home>;
  else return <Signin></Signin>;
}

export default App;
