import axios from 'axios';

const Model = {
  api_url: '/',
  api_format: '.json',

  all() {
    return this.call_api(this.rute());
  },

  find(model_id) {
    return this.call_api(this.rute(model_id));
  },

  add(model) {
    return this.call_api(this.rute(), 'post', model);
  },

  update(model) {
    return this.call_api(this.rute(model.id), 'patch', model);
  },

  destroy(model_id) {
    return this.call_api(this.rute(model_id), 'delete');
  },

  call_api(url, method = 'get', data = {}) {
    return new Promise((resolve, reject) => {
      axios({ method, url, data })
        .then(response => {
          resolve(response.data);
        }).catch(error => {
          reject(error.response.data);
        });
    });
  },

  rute(model_id = null) {
    let element = model_id ? `/${model_id}` : '';
    return `${this.api_url}${element}${this.api_format}`;
  }
};

export default Model;
