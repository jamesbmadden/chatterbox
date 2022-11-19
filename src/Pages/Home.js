import './Home.css';
import '../Logic/spotify.js';

import SpeechRecog from '../SpeechRecognition';

function Home({ userData }) {
  return (
      <div className="Home">
          <header className="Home-header">

              <SpeechRecog></SpeechRecog>
              
          </header>
          
          <img src={ userData.image}/>

          <h2>Hello, { userData.name }</h2>
          

        <p>What would you like to listen to?</p>
          

        </div>
  );
}

export default Home;