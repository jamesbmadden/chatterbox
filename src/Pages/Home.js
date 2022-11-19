import './Home.css';
import '../Logic/spotify.js';

import SpeechRecog from '../SpeechRecognition';

import MediaPlayer from '../Components/MediaPlayer';

function Home({ userData }) {
  return (
    <div className='Home-wrapper'>
      <div className="Home">
          <header className="Home-header">

              <SpeechRecog></SpeechRecog>
              
          </header>
          
        <div className="user-info">
            <img className="profile-photo" src={userData.image} />
            <p>{userData.name}</p>
        </div>

          <h2>Hello, { userData.name }</h2>
          

        <p>What would you like to listen to?</p>
          

        </div>
      <MediaPlayer></MediaPlayer>
    </div>
  );
}

export default Home;