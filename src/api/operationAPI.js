import api from './api';

const operationAPI = {};

operationAPI.addCart = (item_id) => {
  const url = `/addCart`;
  return api.fire({
    url,
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    data: item_id,
  });
};

operationAPI.removeCart = (item_id) => {
  const url = `/removeCart`;
  return api.fire({
    url,
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    data: item_id,
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
