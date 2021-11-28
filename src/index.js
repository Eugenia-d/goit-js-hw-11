import './sass/main.scss';
import { getImages } from './js/imgAPI';

const input = document.querySelector('.input');
const btn = document.querySelector('.btn');
const gallery = document.querySelector('.gallery');

btn.addEventListener('click', async e => {
  e.preventDefault();
  const query = input.value;

  const images = await getImages(query);
  onImagesReceived(images);
});

const onImagesReceived = images => {
  console.log(images);
  const elements = images.data.hits
    .map(image => {
      return `<div class="photo-card">
  <img src="${image.previewURL}" alt="${image.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
    </p>
    <p class="info-item">
      <b>Views</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
    </p>
  </div>
</div>`;
    })
    .join('');

  gallery.insertAdjacentHTML('beforeend', elements);
};
