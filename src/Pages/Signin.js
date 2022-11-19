
import './Signin.css';

import SpeechRecog from '../SpeechRecognition';

function Signin() {
  return (
      <div className="Signin">
          <header className="Signin-header">

              <SpeechRecog></SpeechRecog>
              
          </header>

          <h2>podcast picker app</h2>

          <p>Sign into Spotify</p>
        
          <a className="button" href="">Sign In</a>
          

        </div>
  );
}

export default Signin;