import '../App.css';


import SpeechRecog from '../SpeechRecognition';

function Signin() {
  return (
      <div className="Signin">
          <header className="Signin-header">

              <SpeechRecog></SpeechRecog>
              
          </header>
        
          <a className="button" href="">Sign In</a>
          

        </div>
  );
}

export default Signin;