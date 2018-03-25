import axios from 'axios';

const Model = function(default_api_url = '/') {
  let _methods = { delete: 'delete', get: 'get', patch: 'patch', post: 'post' }
  let _api_url = default_api_url;
  let _api_format = '';
  let _api_token = '';

  function all() {
    return call_api(rute());
  }

  function find(model_id) {
    return call_api(rute(model_id));
  }

  function add(model) {
    return call_api(rute(), _methods.post, model);
  }

  function update(model) {
    return call_api(rute(model.id), _methods.patch, model);
  }

  function destroy(model_id) {
    return call_api(rute(model_id), _methods.delete);
  }

  function call_api(url, method = 'get', data = {}) {
    let headers = set_headers();
    return new Promise((resolve, reject) => {
      axios({ method, url, data, headers })
        .then(response => {
          resolve(response.data);
        }).catch(error => {
          reject({
            messages: error.response.data,
            status: error.response.status
          });
        });
    });
  }

  function api_url(new_api_url) {
    if (new_api_url !== undefined) {
      _api_url = new_api_url;
    }
    return _api_url;
  }

  function api_format(new_api_format) {
    if (new_api_format !== undefined) {
      _api_format = new_api_format;
    }
    return _api_format;
  }

  function api_token(new_api_token) {
    if (new_api_token !== undefined) {
      _api_token = new_api_token;
    }
    return _api_token;
  }

  function rute(model_id = null) {
    let model = model_id ? `/${model_id}` : '';
    return `${_api_url}${model}${_api_format}`;
  }

  function set_headers() {
    return {
      'Authorization': `bearer ${_api_token}`
    };
  }

  return {
    all, find, add, update, destroy, call_api, api_url, api_format, api_token
  };
};

export default Model;
