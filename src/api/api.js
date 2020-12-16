import axios from 'axios';

const api = {};

const instance = axios.create();

api.fire = async (options, API_HOST = process.env.REACT_APP_API_HOST) => {
  return instance
    .request({
      ...options,
      headers: {
        Authorization: `Basic ${localStorage.getItem('authToken')}`,
        ...options.headers,
      },
      url: `${API_HOST}${options.url}`,
    })
    .catch((error) => {
      throw error;
    });
};

export default api;
