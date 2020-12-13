import api from './api';

const operationAPI = {};

operationAPI.addCart = (data) => {
  const url = `/addCart`;
  return api.fire({
    url,
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    data,
  });
};

operationAPI.removeCart = (data) => {
  const url = `/removeCart`;
  return api.fire({
    url,
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    data,
  });
};

operationAPI.addProduct = (product) => {
  const url = `/addProduct`;
  return api.fire({
    url,
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    data: product,
  });
};

operationAPI.reviseProduct = (product) => {
  const url = `/reviseProduct`;
  return api.fire({
    url,
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    data: product,
  });
};

operationAPI.removeProduct = (item_id) => {
  const url = `/removeProduct`;
  return api.fire({
    url,
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    data: item_id,
  });
};

export default operationAPI;
