import api from './api';

const getInfoAPI = {};

getInfoAPI.allCollector = (data = {}) => {
  const url = `/allCollector`;
  return api.fire({
    url,
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    data: data,
  });
};

getInfoAPI.allProduct = (data = {}) => {
  const url = `/allProduct`;
  return api.fire({
    url,
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    data: data,
  });
};

getInfoAPI.itemInfo = (itemId) => {
  const url = `/itemInfo`;
  return api.fire({
    url,
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    data: itemId,
  });
};

getInfoAPI.userInfo = (userId) => {
  const url = `/userInfo`;
  return api.fire({
    url,
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    data: userId,
  });
};

export default getInfoAPI;
