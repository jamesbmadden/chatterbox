import logo from './logo.svg';
import './App.css';

import Spotify from './Logic/spotify';
import SpeechRecog from './SpeechRecognition';

const spotify = new Spotify();

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <SpeechRecog></SpeechRecog>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
