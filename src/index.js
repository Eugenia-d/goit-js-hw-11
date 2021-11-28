import './sass/main.scss';
import { getImages } from './js/imgAPI';

const input = document.querySelector('.input');
const btn = document.querySelector('.btn');
const gallery = document.querySelector('.gallery');

btn.addEventListener('click', async e => {
  e.preventDefault();
  const query = input.value;

  console.log(query);

  const images = await getImages(query);

  console.log(images);
});
