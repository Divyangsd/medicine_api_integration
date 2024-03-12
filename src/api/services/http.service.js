const axios = require('axios');
const { BASE_URL } = require('../../config/properties-config');

class HttpService {
  
  constructor() {
    this.options = {
      baseURL: BASE_URL,
      headers: {},
      url: ''
    }
  };

  get(url) {
    this.options.url = url;
    this.options.method = 'GET';
    this.options.headers['Content-Type'] = 'application/json';
    return axios(this.options);
  }
}

module.exports = new HttpService();