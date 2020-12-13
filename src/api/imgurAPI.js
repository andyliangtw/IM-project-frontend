import api from './api';

const imgurAPI = {};

const API_HOST = 'https://api.imgur.com';

imgurAPI.uploadImg = (img) => {
  const data = new FormData();
  data.append(
    'image',
    'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
  );
  return api.fire(
    {
      url: `/3/image`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Client-ID fb99377dccd183d',
        ...data.getHeaders(),
      },
      method: 'POST',
      data,
    },
    API_HOST,
  );
};
