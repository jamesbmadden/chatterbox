// provides methods and keeps track of data for the current user
export default class Spotify {

  static clientID = '90ae0899c413413d996517f2999e8648';

  loggedIn = false;

  // properties for us to play with
  accessToken = '';

  // user data once signed in
  userData = {
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Square_gray.svg/1200px-Square_gray.svg.png',
    name: 'James Madden'
  };

  constructor () {

    // read the current url. If there's an access token from spotify, we're in! Otherwise, we'll need a login.
    if (window.location.hash && window.location.hash.includes('access_token')) {
      this.loggedIn = true;
      // grab the access token from the hash
      this.accessToken = window.location.hash.split('=')[1].split('&')[0];
    } else this.loggedIn = false;

  }

  /**
   * Generates the url to trigger the sign in flow on spotify
   * @returns the url
   */
  getLoginHref() {
  
    // send the user to the spotify page
    return `https://accounts.spotify.com/authorize?response_type=token&client_id=${Spotify.clientID}&redirect_uri=http%3A%2F%2Flocalhost%3A3000`;

  }

}