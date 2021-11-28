import './sass/main.scss';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getImages, PAGE_SIZE } from './js/imgAPI';
import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';

const input = document.querySelector('.input');
const btnLoadMore = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');
const form = document.getElementById('search-form');

btnLoadMore.hidden = true;
const lightBox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

let query = null;
let pageNumber = 1;
let totalHits = 0;

const makeRequest = async () => {
  const images = await getImages(query, pageNumber);
  onImagesReceived(images);
};

form.addEventListener('submit', async e => {
  e.preventDefault();
  query = input.value;
  pageNumber = 1;
  gallery.innerHTML = '';
  btnLoadMore.hidden = true;

  makeRequest();
});

btnLoadMore.addEventListener('click', makeRequest);

const onImagesReceived = images => {
  console.log(images);

  pageNumber += 1;
  totalHits = images.data.totalHits;
  if (totalHits === 0) {
    Notify.warning('Sorry, there are no images matching your search query. Please try again.');
    btnLoadMore.hidden = true;
  } else if (pageNumber * PAGE_SIZE >= totalHits) {
    btnLoadMore.hidden = true;
    Notify.info("We're sorry, but you've reached the end of search results.");
  } else {
    Notify.success(`Hooray! We found ${totalHits} images.`);
    btnLoadMore.hidden = false;
  }

  const elements = images.data.hits
    .map(image => {
      return ` <div class="photo-card">
        <a href="${image.largeImageURL}">
           <img class="img" src="${image.previewURL}" alt="${image.tags}" loading="lazy"  width="250
           " height="150"/>
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
  lightBox.refresh();
};
