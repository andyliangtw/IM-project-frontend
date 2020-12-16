import api from './api';

const transactionAPI = {};

transactionAPI.confirmOrder = () => {
  const url = `/confirmOrder`;
  return api.fire({
    url,
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  });
};

transactionAPI.confirmReceive = (transaction_address) => {
  const url = `/confirmReceive`;
  return api.fire({
    url,
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    data: transaction_address,
  });
};

export default transactionAPI;
