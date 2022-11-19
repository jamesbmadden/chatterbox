
import './Signin.css';

import SpeechRecog from '../SpeechRecognition';

// takes in a function to trigger the login
function Signin({ getLoginHref }) {
  return (
      <div className="Signin">
          <header className="Signin-header">

              <SpeechRecog></SpeechRecog>
              
          </header>

          <h2>chatterbox</h2>

          <p>Sign into Spotify</p>
        
          <a className="button" href={getLoginHref()}>SIGN IN</a>
          

        </div>
  );
}

export default Signin;