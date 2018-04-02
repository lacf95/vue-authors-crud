import axios from '../config/axios';

axios.refreshToken();

const Model = (apiUrl = '/', apiFormat = '') => {
  const _verbs = { delete: 'delete', get: 'get', patch: 'patch', post: 'post' };
  let _apiUrl = apiUrl;
  let _apiFormat = apiFormat;

  function all() {
    return callApi(rute());
  }

  function find(modelId) {
    return callApi(rute(modelId));
  }

  function add(model) {
    return callApi(rute(), _verbs.post, model);
  }

  function update(model) {
    return callApi(rute(model.id), _verbs.patch, model);
  }

  function destroy(modelId) {
    return callApi(rute(modelId), _verbs.delete);
  }

  function callApi(url, method = _verbs.get, data = {}) {
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

  function rute(modelId = null) {
    let model = modelId ? `/${modelId}` : '';
    return `${_apiUrl}${model}${_apiFormat}`;
  }

  return {
    all, find, add, update, destroy, callApi,
    get apiUrl() { return _apiUrl; },
    set apiUrl(apiUrl) { _apiUrl = apiUrl; },
    get apiFormat() { return _apiFormat; },
    set apiFormat(apiFormat) { _apiFormat = apiFormat; },
    get verbs() { return _verbs; }
  };
};

export default Model;
