import Model from './model';

const Auth = new Model();

Auth.signIn = function signIn(credential) {
  return this.callApi('/v1/sign-in', 'post', credential);
}

Auth.signUp = function signUp(user) {
  return this.callApi('/v1/sign-up', 'post', user);
}

export default Auth;
