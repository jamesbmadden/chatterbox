// provides methods and keeps track of data for the current user
export default class Spotify {

  static clientID = '90ae0899c413413d996517f2999e8648';

  loggedIn = false;

  // properties for us to play with
  accessToken = '';

  // trigger a refresh in the app component
  updateApp = () => {};

  // user data once signed in
  userData = {
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Square_gray.svg/1200px-Square_gray.svg.png',
    name: 'loading'
  };

  // whether or not the current output is paused
  isPaused = true;

  // keep track of what's currently being played
  nowPlaying = {
    artist: '',
    title: '',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Square_gray.svg/1200px-Square_gray.svg.png'
  };
  // and the spotify player instance
  spotifyPlayer;
  // and the ID for the app
  deviceID;

  constructor () {

    // read the current url. If there's an access token from spotify, we're in! Otherwise, we'll need a login.
    if (window.location.hash && window.location.hash.includes('access_token')) {
      this.loggedIn = true;
      // grab the access token from the hash
      this.accessToken = window.location.hash.split('=')[1].split('&')[0];
      // now we can load the current user's data
      this.getUserData();
      // and get the current track
      this.getNowPlayingInfo();
      // and initialize the spotify sdk
      this.initSpotifySdk();
    } else this.loggedIn = false;

  }

  /**
   * Generates the url to trigger the sign in flow on spotify
   * @returns the url
   */
  getLoginHref() {
  
    const scope = encodeURIComponent('user-read-private user-read-email user-read-playback-state streaming');
    // send the user to the spotify page
    return `https://accounts.spotify.com/authorize?response_type=token&client_id=${Spotify.clientID}&scope=${scope}&redirect_uri=http%3A%2F%2Flocalhost%3A3000`;

  }

  /**
   * Sign the current user out.
   */
  signOut () {
    this.loggedIn = false;
    window.location.hash = '';
    this.updateApp();
  }

  /**
   * Creates an instance of headers ready to go with the access token
   */
  genAuthHeaders () {

    // create and set the authorization headers
    const headers = new Headers();
    headers.set('Authorization', `Bearer ${this.accessToken}`);

    return headers;

  }

  /**
   * loads info about the user 
   */
  async getUserData() {

    const headers = this.genAuthHeaders();
    
    const result = await fetch('https://api.spotify.com/v1/me', { headers });
    const userJson = await result.json();

    // check whether the user has a profile picture or not. If no, use the default
    let image = this.userData.image;
    if (userJson.images) image = userJson.images[0].url;

    this.userData = {
      name: userJson['display_name'],
      image
    };

    this.updateApp();

  }

  /**
   * sets up the spotify web playback sdk with the current user's token
   */
  initSpotifySdk() {

    window.onSpotifyWebPlaybackSDKReady = () => {
      this.spotifyPlayer = new window.Spotify.Player({
        name: 'Chatterbox',
        getOAuthToken: cb => { cb(this.accessToken); },
        volume: 0.5
      });

      // Ready
      this.spotifyPlayer.addListener('ready', ({ device_id }) => {
        this.deviceID = device_id;
      });

      // Not Ready
      this.spotifyPlayer.addListener('not_ready', ({ device_id }) => {
        this.deviceID = null;
      });

      this.spotifyPlayer.addListener('player_state_changed', ({
        position,
        duration,
        track_window: { current_track }
      }) => {
        
        // there's been an update! show it!
        this.getNowPlayingInfo();

      });

      this.spotifyPlayer.connect();
      this.spotifyPlayer.pause();
    };

  }

  /**
   * Gets the player to play the inputted track
   * @param {*} uri the uri of the thing to play
   */
  async play(uri) {

    const headers = this.genAuthHeaders();

    // send spotify what to play
    await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${this.deviceID}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ uris: [uri] })
    });

    this.isPaused = false;
    

  }

  /**
   * Gets the info of the current track and records it to the nowPlaying property
   */
  async getNowPlayingInfo() {

    const headers = this.genAuthHeaders();

    // load the data from spotify
    const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing?additional_types=episode', { headers });
    let trackJson = {};

    try {
      trackJson = await response.json();

      console.log(trackJson);

      // set the now playing, whether its a podcast or a track
      if (trackJson.currently_playing_type == 'track') {
        this.nowPlaying = {
          image: trackJson.item.album.images[0].url,
          title: trackJson.item.name,
          artist: trackJson.item.artists[0].name
        }
      } else if (trackJson.currently_playing_type == 'episode') {
        this.nowPlaying = {
          image: trackJson.item.images[0].url,
          title: trackJson.item.name,
          artist: trackJson.item.show.name
        }
      }

      this.updateApp();

    } catch (error) {
      // there's nothing playing. return to default now playing info
      this.nowPlaying = {
        artist: '',
        title: '',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Square_gray.svg/1200px-Square_gray.svg.png'
      }
    }

  }

  togglePlayback () {
    console.log('toggling playback')

    this.isPaused = !this.isPaused;
    this.spotifyPlayer.togglePlay();

    this.updateApp();
  }

  play() {

    this.isPaused = false;
    this.spotifyPlayer.resume();

    this.updateApp();

  }

  pause() {

    this.isPaused = true;
    this.spotifyPlayer.pause();

    this.updateApp();

  }

}