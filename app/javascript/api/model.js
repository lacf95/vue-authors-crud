import axios from '../config/axios';

axios.refreshToken();

const Model = function(defaultApiUrl = '/') {
  let _methods = { delete: 'delete', get: 'get', patch: 'patch', post: 'post' }
  let _apiUrl = defaultApiUrl;
  let _apiFormat = '';

  function all() {
    return callApi(rute());
  }

  function find(modelId) {
    return callApi(rute(modelId));
  }

  function add(model) {
    return callApi(rute(), _methods.post, model);
  }

  function update(model) {
    return callApi(rute(model.id), _methods.patch, model);
  }

  function destroy(modelId) {
    return callApi(rute(modelId), _methods.delete);
  }

  function callApi(url, method = 'get', data = {}) {
    return new Promise((resolve, reject) => {
      axios({ method, url, data })
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

  function apiUrl(newApiUrl) {
    if (newApiUrl !== undefined) {
      _apiUrl = newApiUrl;
    }
    return _apiUrl;
  }

  function apiFormat(newApiFormat) {
    if (newApiFormat !== undefined) {
      _apiFormat = newApiFormat;
    }
    return _apiFormat;
  }

  function rute(modelId = null) {
    let model = modelId ? `/${modelId}` : '';
    return `${_apiUrl}${model}${_apiFormat}`;
  }

  return {
    all, find, add, update, destroy, callApi, apiUrl, apiFormat
  };
};

export default Model;
