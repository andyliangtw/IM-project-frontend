import api from './api';

const userAPI = {};

userAPI.register = (newUser) => {
  const url = `/register`;
  return api.fire({
    url,
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    data: newUser,
  });
};

userAPI.login = (data) => {
  const url = `/login`;
  return api.fire({
    url,
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    data: data,
  });
};

userAPI.logout = () => {
  const url = `/logout`;
  return api.fire({
    url,
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });
};

export default userAPI;
