import api from './api';

const imgurAPI = {};

imgurAPI.uploadImage = (image) => {
  const data = new FormData();
  data.append('image', image);
  return api.fire(
    {
      url: `/3/image`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Client-ID ${process.env.REACT_APP_IMGUR_CLIENT_ID}`,
      },
      method: 'POST',
      data,
    },
    process.env.REACT_APP_IMGUR_API_HOST,
  );
};

export default imgurAPI;
