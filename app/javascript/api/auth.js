import Model from './model';

const Auth = new Model();

Auth.signIn = credential => {
  return Auth.self.request('/v1/sign-in', Auth.self.VERBS.post, credential);
}

Auth.signUp = user => {
  return Auth.self.request('/v1/sign-up', Auth.self.VERBS.post, user);
}

export default Auth;
