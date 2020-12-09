import api from './api';

const transactionAPI = {};

transactionAPI.comfirmOrder = () => {
  const url = `/comfirmOrder`;
  return api.fire({
    url,
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  });
};

transactionAPI.comfirmReceive = () => {
  const url = `/comfirmReceive`;
  return api.fire({
    url,
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  });
};

export default transactionAPI;
