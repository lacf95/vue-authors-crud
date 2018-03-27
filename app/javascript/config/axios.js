import axios from 'axios';
import Session from '../config/session';

axios.refreshToken = function() {
  axios.defaults.headers.common['Authorization'] = `bearer ${Session.getValue('token')}`;
}

export default axios;

