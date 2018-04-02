import Model from './model';

const Auth = Model();

Auth.signIn = credential => {
  return Auth.callApi('/v1/sign-in', Auth.verbs.post, credential);
}

Auth.signUp = user => {
  return Auth.callApi('/v1/sign-up', Auth.verbs.post, user);
}

export default Auth;
