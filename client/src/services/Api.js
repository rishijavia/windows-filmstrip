var axios = require('axios');

// Global URL for the server, this variable is used everywhere
// so if you update the server url only this variable needs to updated
var URL = 'http://localhost:8081'

// Create axiosInstance to use the API in vue
var axiosInstance = axios.create({
  baseURL: URL
});

module.exports = { axiosInstance, URL }
