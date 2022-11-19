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

  // keep track of what's currently being played
  nowPlaying = {};
  // and the spotify player instance
  spotifyPlayer;

  constructor () {

    // read the current url. If there's an access token from spotify, we're in! Otherwise, we'll need a login.
    if (window.location.hash && window.location.hash.includes('access_token')) {
      this.loggedIn = true;
      // grab the access token from the hash
      this.accessToken = window.location.hash.split('=')[1].split('&')[0];
      // now we can load the current user's data
      this.getUserData();
      // and initialize the spotify sdk
      this.initSpotifySdk();
    } else this.loggedIn = false;

  }

  /**
   * Generates the url to trigger the sign in flow on spotify
   * @returns the url
   */
  getLoginHref() {
  
    const scope = encodeURIComponent('user-read-private user-read-email streaming');
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
   * loads info about the user 
   */
  async getUserData() {

    // create and set the authorization headers
    const headers = new Headers();
    headers.set('Authorization', `Bearer ${this.accessToken}`);
    
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

      this.spotifyPlayer.connect();
    };

  }

}