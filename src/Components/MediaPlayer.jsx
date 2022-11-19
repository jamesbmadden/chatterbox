import './MediaPlayer.css';

import PlayIcon from '../Assets/Icons/play.svg';
import PauseIcon from '../Assets/Icons/pause.svg';

export default function MediaPlayer ({ spotify }) {

  return (
    <div className="mediaplayer">
      {/* this img is the blurred background of the media player */}
      <img className="mediaplayer-bg" src={spotify.nowPlaying.image}></img>
      {/* Header is the portion that can be seen at all times. */}
      <header>
        <img className="mediaplayer-header--img" src={spotify.nowPlaying.image}></img>
        <div className='mediaplayer-header--about'>
          <h1>{spotify.nowPlaying.title}</h1>
          <h2>{spotify.nowPlaying.artist}</h2>
        </div>
        <div className='mediaplayer-header--controls'>
          <img className='mediaplayer-header--playpause' onClick={() => spotify.togglePlayback() } src={spotify.isPaused ? PlayIcon : PauseIcon}></img>
        </div>
      </header>
      <button onClick={() => spotify.play('spotify:track:6SRsiMl7w1USE4mFqrOhHC')}>Play</button>
    </div>
  );

}