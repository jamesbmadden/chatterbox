
import './Signin.css';

// takes in a function to trigger the login
function Signin({ getLoginHref }) {
  return (
      <div className="Signin">
          <header className="Signin-header">
              
          </header>

          <h2 className="title">chatterbox</h2>

          <p className="signin-text">Sign into Spotify</p>
        
          <a className="button" href={getLoginHref()}>SIGN IN</a>
          
          <p className='signin-wales'>Made with ♥ by The Whales</p>

        </div>
  );
}

export default Signin;