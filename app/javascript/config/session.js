import axios from './axios';

export default (function () {
  function add(key, value) {
    sessionStorage.setItem(key, value);
  }

  function remove(key = 'session') {
    sessionStorage.removeItem(key);
  }

  function get(key = 'session') {
    return JSON.parse(sessionStorage.getItem(key));
  }

  function getValue(key) {
    let session = get();
    if (session) {
      return session[key];
    }
  }

  function signIn(credential) {
    add('session', JSON.stringify(credential));
    axios.refreshToken();
  }

  function signOut() {
    remove();
    axios.refreshToken();
  }

  return { signIn, signOut, getValue, get };
}());
