import axios from 'axios';

const api = {};

const API_TIMEOUT_DUR = 30000;
const instance = axios.create({
  timeout: API_TIMEOUT_DUR,
});

api.fire = async (options, API_HOST = 'http://localhost:5000') => {
  return instance
    .request({
      ...options,
      headers: {
        ...options.headers,
        Authorization: `${sessionStorage.getItem('authToken')}`,
      },
      url: `${API_HOST}${options.url}`,
    })
    .catch((error) => {
      throw error;
    });
};

export default api;
