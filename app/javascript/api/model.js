import axios from 'axios';

const Model = (function() {
  let _api_url = '/';
  let _api_format = '.json';

  function all() {
    return call_api(rute());
  }

  function find(model_id) {
    return call_api(rute(model_id));
  }

  function add(model) {
    return call_api(rute(), 'post', model);
  }

  function update(model) {
    return call_api(rute(model.id), 'patch', model);
  }

  function destroy(model_id) {
    return call_api(rute(model_id), 'delete');
  }

  function api_url(new_api_url) {
    _api_url = new_api_url;
  }

  function api_format(new_api_format) {
    _api_format = new_api_format;
  }

  function call_api(url, method = 'get', data = {}) {
    return new Promise((resolve, reject) => {
      axios({ method, url, data })
        .then(response => {
          resolve(response.data);
        }).catch(error => {
          reject(error.response.data);
        });
    });
  }

  function rute(model_id = null) {
    let model = model_id ? `/${model_id}` : '';
    return `${_api_url}${model}${_api_format}`;
  }

  return { all, find, add, update, destroy, api_url, api_format };
}());

export default Model;
