import './MediaPlayer.css';

import PlayIcon from '../Assets/Icons/play.svg';
import PauseIcon from '../Assets/Icons/pause.svg';
import NextIcon from '../Assets/Icons/next.svg';
import PrevIcon from '../Assets/Icons/prev.svg';

import SpeechRecog from '../SpeechRecognition';

export default function MediaPlayer ({ spotify }) {

  return (
    <div className="mediaplayer">

      {/* Provide the speech recognition services for playing, pausing etc */}
      <SpeechRecog spotify={spotify}></SpeechRecog>

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
      <main className='mediaplayer-large'>
        <img className="mediaplayer-large--img" src={spotify.nowPlaying.image}></img>
        <h1>{spotify.nowPlaying.title}</h1>
        <h2>{spotify.nowPlaying.artist}</h2>
      </main>
      <div className='mediaplayer-large--controls'>
        <img className={'mediaplayer-large--control ' + (spotify.queueIndex > 0 ? '' : 'hidden')} onClick={() => spotify.prevTrack() } src={PrevIcon}></img>
        <img className='mediaplayer-large--playpause mediaplayer-large--control' onClick={() => spotify.togglePlayback() } src={spotify.isPaused ? PlayIcon : PauseIcon}></img>
        <img className='mediaplayer-large--control' onClick={() => spotify.nextTrack() } src={NextIcon}></img>
      </div>
    </div>
  );

}