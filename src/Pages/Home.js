import './Home.css';
import '../Logic/spotify.js';

/** podcast cover imports */
import NewsCover1 from '../Assets/PodcastExamples/the-daily-album-art-superJumbo-v2.jpeg';
import NewsCover2 from '../Assets/PodcastExamples/podcast-template-front-burner-2022.webp';
import ComedyCover1 from '../Assets/PodcastExamples/Smartless-1024x1024.jpeg';
import ComedyCover2 from '../Assets/PodcastExamples/ab6765630000ba8a0e451d2e3cd95e758580d7cc.jpeg';
import TrueCrimeCover1 from '../Assets/PodcastExamples/aHR0cHM6Ly9pbWFnZS5zaW1wbGVjYXN0Y2RuLmNvbS9pbWFnZXMvYWUxODNmZTItYzYzNC00NThhLTkzZGQtNTc3MGYwNjc2Zjc3L2IwMTA4MDlhLWMzMTEtNDI1Yy05MzI1LTIyMzVjMjFlNjkzOS8zMDAweDMwMDAvN2YwNDIxZjczZDJjZTBjYTI3MmUzOTJjOTM3ZTFhMzAxMjg1ZDQ0ZmU3YzZkNzEwYzI4NDRkODB.webp';
import TrueCrimeCover2 from '../Assets/PodcastExamples/ab6765630000ba8a2e9ceef055f8c77769f8fa8f.jpeg';

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
            <img className="profile-photo" src={spotify.userData.image} alt="User's profile photo"/>
            <p>{spotify.userData.name}</p>
        </div>

          <h2>Hello, { spotify.userData.name }</h2>
          

        <p>What would you like to listen to?</p>

              <button onClick={() => { spotify.signOut() }}>Log Out</button>

              <h3>Genres</h3>

              <h4>True Crime</h4>
              <img className="podcast-cover" src={ TrueCrimeCover1} alt="Podcast cover" />
              <img className="podcast-cover" src={ TrueCrimeCover2} alt="Podcast cover"/>

              <h4>News</h4>
              <img className="podcast-cover" src={NewsCover1} alt="Podcast cover"/>
              <img className="podcast-cover" src={ NewsCover2 } alt="Podcast cover"/>

              <h4>Comedy</h4>
              <img className="podcast-cover" src={ ComedyCover1 } alt="Podcast cover"/>
              <img className="podcast-cover" src={ComedyCover2 } alt="Podcast cover"/>

              {/* can add more to demo scrolling */}
    {/*  
    <h4>Sports</h4>
              <img className="podcast-cover" src={ } />
              <img className="podcast-cover" src={ }/>

              <h4>Business</h4>
              <img className="podcast-cover" src={ } />
              <img className="podcast-cover" src={ }/>
    */ }
              

        </div>
      <MediaPlayer spotify={spotify}></MediaPlayer>
    </div>
  );
}

export default Home;