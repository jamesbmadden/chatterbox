import logo from './logo.svg';
import './App.css';

import Spotify from './Logic/spotify';
import Signin from './Pages/Signin.js';
import Home from './Pages/Home.js';

import SpeechRecog from './SpeechRecognition';

const spotify = new Spotify();

function App() {

  if (spotify.loggedIn) return <Home userData={spotify.userData}></Home>;
  else return <Signin getLoginHref={() => spotify.getLoginHref()}></Signin>;
}

export default App;
