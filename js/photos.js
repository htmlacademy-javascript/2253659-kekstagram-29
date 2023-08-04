import { getData } from './api.js';
import { showAlert } from './util.js';

const photoCardTemplate = document.querySelector('#picture').content.querySelector('.picture');

const photoCardFragment = document.createDocumentFragment();

const addPhotosOnPage = (array) => {
  array.forEach(({ url, description, likes, comments, id }) => {
    const photoCard = photoCardTemplate.cloneNode(true);
    const img = photoCard.querySelector('.picture__img');
    img.src = url;
    img.alt = description;
    photoCard.querySelector('.picture__likes').textContent = likes;
    photoCard.querySelector('.picture__comments').textContent = comments.length;
    photoCard.setAttribute('data-id', id);
    photoCardFragment.append(photoCard);
  });

  document.querySelector('.pictures').append(photoCardFragment);
};

let tmpPhotos = [];
try {
  const data = await getData();
  addPhotosOnPage(data);
  tmpPhotos = data.slice(data);
} catch (err) {
  showAlert(err.message);
}
const photos = tmpPhotos.slice();

export { photos };
