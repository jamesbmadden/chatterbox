import React, { useRef, useEffect } from 'react';

import './Home.css';
import '../Logic/spotify.js';

/** podcast cover imports */
import NewsCover1 from '../Assets/PodcastExamples/the-daily-album-art-superJumbo-v2.jpeg';
import NewsCover2 from '../Assets/PodcastExamples/podcast-template-front-burner-2022.webp';
import ComedyCover1 from '../Assets/PodcastExamples/Smartless-1024x1024.jpeg';
import ComedyCover2 from '../Assets/PodcastExamples/officeladiespodcast.jpeg';
import TrueCrimeCover1 from '../Assets/PodcastExamples/datelinepodcast.webp';
import TrueCrimeCover2 from '../Assets/PodcastExamples/crimejunkiepodcast.jpeg';

import MediaPlayer from '../Components/MediaPlayer';

function Home({ spotify }) {

  // keep track of the scroll position of home wrapper for the opacity effect on the mini player controls
  const wrapperRef = useRef(null);

  useEffect(() => {

    wrapperRef.current.addEventListener('scroll', event => {

      // final scroll position would be innerHeight - 80px
      const totalScroll = window.innerHeight - 80;

      const scrollPercent = event.target.scrollTop / totalScroll;

      // set the opacity of the mini player and homepage to the opposite of scroll percent
      event.target.querySelector('.mediaplayer header').style.opacity = 1 - scrollPercent;
      event.target.querySelector('.mediaplayer-large').style.opacity = scrollPercent;
    }, { passive: true });

  }, []);

  return (
    <div className='Home-wrapper' ref={wrapperRef}>
      <div className="Home">
          <header className="Home-header">
              
          </header>
          
        <div className="user-info">
            <img className="profile-photo" src={spotify.userData.image} alt="User's profile photo"/>
            <p>{spotify.userData.name}</p>
        </div>

          <h2>Hello, { spotify.userData.name }</h2>
          

        <p>What would you like to listen to?</p>

              <button onClick={() => spotify.playTrack('spotify:track:6SRsiMl7w1USE4mFqrOhHC')}>Play</button>
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