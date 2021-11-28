const API_KEY = '24558958-a01582c8f081cdc4521b20935';
const API_URL = 'https://pixabay.com/api/';

import { get } from 'axios';

export const getImages = query => {
  var url = new URL(API_URL);
  url.searchParams.append('key', API_KEY);
  url.searchParams.append('q', query);
  url.searchParams.append('image_type', 'photo');
  url.searchParams.append('orientation', 'horizontal');
  url.searchParams.append('safesearch', 'true');

  const data = get(url);
  return data;
};
