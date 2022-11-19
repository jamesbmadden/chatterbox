import './Home.css';
import '../Logic/spotify.js';

import SpeechRecog from '../SpeechRecognition';

import MediaPlayer from '../Components/MediaPlayer';

function Home({ spotify }) {
  return (
    <div className='Home-wrapper'>
      <div className="Home">
          <header className="Home-header">

              <SpeechRecog></SpeechRecog>
              
          </header>
          
        <div className="user-info">
            <img className="profile-photo" src={spotify.userData.image}/>
            <p>{spotify.userData.name}</p>
        </div>

          <h2>Hello, { spotify.userData.name }</h2>
          

        <p>What would you like to listen to?</p>

        <button onClick={() => {spotify.signOut()}}>Log Out</button>

        <p style={{ marginBottom: '400vh'}}>This gives padding so scroll behaviour is demoed properly</p>
          

        </div>
      <MediaPlayer></MediaPlayer>
    </div>
  );
}

export default Home;