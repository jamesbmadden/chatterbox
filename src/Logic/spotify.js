// provides methods and keeps track of data for the current user
export default class Spotify {

  static clientID = '90ae0899c413413d996517f2999e8648';

  loggedIn = false;

  login() {
  
    // send the user to the spotify page
    const link = document.createElement('a');
    link.href = `https://accounts.spotify.com/authorize?response_type=token&client_id=${Spotify.clientID}&redirect_uri=http%3A%2F%2Flocalhost%3A3000`;

    document.body.appendChild(link);
    link.click();
    // page is now unloaded because we're on spotify's domain now

  }

}