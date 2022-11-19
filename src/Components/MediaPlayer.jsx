import './MediaPlayer.css';

export default function MediaPlayer ({ spotify }) {

  return (
    <div className="mediaplayer">
      {/* this img is the blurred background of the media player */}
      <img className="mediaplayer-bg" src={spotify.nowPlaying.image}></img>
      {/* Header is the portion that can be seen at all times. */}
      <header>
        <p>Img and podcast info here</p>
        <button onClick={() => spotify.spotifyPlayer.togglePlay()}>Toggle Playback</button>
        <button onClick={() => spotify.play('spotify:track:6SRsiMl7w1USE4mFqrOhHC')}>Play</button>
      </header>
    </div>
  );

}