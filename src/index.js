import './sass/main.scss';
import { getImages } from './js/imgAPI';

const input = document.querySelector('.input');
const btn = document.querySelector('.btn');
const btnLoadMore = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');
btnLoadMore.hidden = true;

let query = null;
let pageNumber = 1;

const makeRequest = async () => {
  const images = await getImages(query, pageNumber);
  onImagesReceived(images);
};

btn.addEventListener('click', async e => {
  e.preventDefault();
  query = input.value;
  gallery.innerHTML = '';
  btnLoadMore.hidden = true;

  makeRequest();
});

btnLoadMore.addEventListener('click', makeRequest);

const onImagesReceived = images => {
  console.log(images);
  pageNumber += 1;
  const elements = images.data.hits
    .map(image => {
      return ` <div class="photo-card">
        <a href="${image.largeImageURL}">
           <img src="${image.previewURL}" alt="${image.tags}" loading="lazy" width="250" height="150"/>
    <div class="info">
      <p class="info-item">
        <b>Likes</b> ${image.likes}
      </p>
      <p class="info-item">
        <b>Views</b> ${image.views}
      </p>
      <p class="info-item">
        <b>Comments</b> ${image.comments}
      </p>
      <p class="info-item">
        <b>Downloads</b> ${image.downloads}
      </p>
    </div></a>
  </div>`;
    })
    .join('');

  gallery.insertAdjacentHTML('beforeend', elements);
  btnLoadMore.hidden = false;
};
