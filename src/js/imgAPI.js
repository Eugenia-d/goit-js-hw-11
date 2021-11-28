const API_KEY = '24558958-a01582c8f081cdc4521b20935';
const API_URL = 'https://pixabay.com/api/';
export const PAGE_SIZE = 40;

import { get } from 'axios';

export const getImages = (query, page = 1) => {
  var url = new URL(API_URL);
  url.searchParams.append('key', API_KEY);
  url.searchParams.append('q', query);
  url.searchParams.append('image_type', 'photo');
  url.searchParams.append('orientation', 'horizontal');
  url.searchParams.append('safesearch', 'true');
  url.searchParams.append('per_page', PAGE_SIZE);
  url.searchParams.append('page', page);

  const data = get(url);
  return data;
};
