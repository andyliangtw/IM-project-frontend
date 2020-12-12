import axios from 'axios';
import FormData from 'form-data';

const data = new FormData();
data.append(
  'image',
  'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
);

const config = {
  method: 'POST',
  url: 'https://api.imgur.com/3/image',
  headers: {
    Authorization: 'Client-ID fb99377dccd183d',
    ...data.getHeaders(),
  },
  data: data,
};

axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
