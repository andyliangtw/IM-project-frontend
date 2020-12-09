import api from './api';

const getInfoAPI = {};

getInfoAPI.allCollector = () => {
  const url = `/allCollector`;
  return api.fire({
    url,
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  });
};

getInfoAPI.itemInfo = (itemId) => {
  const url = `/itemInfo`;
  return api.fire({
    url,
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
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
    method: 'GET',
    data: userId,
  });
};

export default getInfoAPI;
