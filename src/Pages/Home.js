import React, { useRef, useEffect } from 'react';

import './Home.css';
import '../Logic/spotify.js';

/** podcast cover imports */
import NewsCover from '../Assets/PodcastExamples/the-daily-album-art-superJumbo-v2.jpeg';
import ComedyCover from '../Assets/PodcastExamples/Smartless-1024x1024.jpeg';
import TrueCrimeCover from '../Assets/PodcastExamples/datelinepodcast.webp';
import WellnessCover from '../Assets/PodcastExamples/wellness-podcast.webp';
import FitnessCover from '../Assets/PodcastExamples/fitness-podcast.jpg';
import HealthCover from '../Assets/PodcastExamples/health-podcast.webp';
import BusinessCover from '../Assets/PodcastExamples/business-podcast.png';
import SportsCover from '../Assets/PodcastExamples/sports-podcast.jpg';
import ArtsCover from '../Assets/PodcastExamples/art-podcast.jpg';
import MusicCover from '../Assets/PodcastExamples/music-podcast.png';
import FoodCover from '../Assets/PodcastExamples/food-podcast.jpg';
import CultureCover from '../Assets/PodcastExamples/culture-podcast.png';

import MediaPlayer from '../Components/MediaPlayer';
import GenreCard from '../Components/GenreCard';

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

        <button onClick={() => { spotify.signOut() }}>Log Out</button>

        <h3>Genres</h3>

        <div className='genre-grid'>
          <GenreCard genre="Health" image={HealthCover} onClick={() => spotify.search('health')} colour="rgb(0, 111, 154)" transparent="rgba(0, 111, 154, 0.2)"></GenreCard>
          <GenreCard genre="Wellness" image={WellnessCover} onClick={() => spotify.search('health')} colour="rgb(244, 186, 24)" transparent="rgba(244, 186, 24, 0.2)"></GenreCard>
          <GenreCard genre="True Crime" image={TrueCrimeCover} onClick={() => spotify.search('true crime')} colour="rgb(15, 34, 43)" transparent="rgba(15, 34, 43, 0.2)"></GenreCard>
          <GenreCard genre="News" image={NewsCover} onClick={() => spotify.search('news')} colour="rgb(120, 175, 100)" transparent="rgba(120, 175, 100, 0.2)"></GenreCard>
          <GenreCard genre="Comedy" image={ComedyCover} onClick={() => spotify.search('comedy')} colour="rgb(241, 21, 47)" transparent="rgba(241, 21, 47, 0.2)"></GenreCard>
          <GenreCard genre="Sports" image={SportsCover} onClick={() => spotify.search('sports')} colour="rgb(25, 25, 25)" transparent="rgba(25, 25, 25, 0.2)"></GenreCard>
          <GenreCard genre="Business" image={BusinessCover} onClick={() => spotify.search('business')} colour="rgb(7, 45, 6)" transparent="rgba(7, 45, 6, 0.2)"></GenreCard>
          <GenreCard genre="Arts" image={ArtsCover} onClick={() => spotify.search('arts')} colour="rgb(187, 95, 120)" transparent="rgba(187, 95, 120, 0.2)"></GenreCard>
          <GenreCard genre="Fitness" image={FitnessCover} onClick={() => spotify.search('fitness')} colour="rgb(4, 114, 202)" transparent="rgba(4, 114, 202, 0.2)"></GenreCard>
          <GenreCard genre="Music" image={MusicCover} onClick={() => spotify.search('music')} colour="rgb(254, 81, 39)" transparent="rgba(254, 81, 39, 0.2)"></GenreCard>
          <GenreCard genre="Food" image={FoodCover} onClick={() => spotify.search('food')} colour="rgb(91, 190, 99)" transparent="rgba(91, 190, 99, 0.2)"></GenreCard>
          <GenreCard genre="Culture" image={CultureCover} onClick={() => spotify.search('culture')} colour="rgb(0, 17, 37)" transparent="rgba(0, 17, 37, 0.2)"></GenreCard>
        </div>
      </div>
      <MediaPlayer spotify={spotify}></MediaPlayer>
    </div>
  );
}

export default Home;