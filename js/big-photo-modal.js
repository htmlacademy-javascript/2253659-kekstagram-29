import { photos } from './photos.js';
import { isEnterKey, isEscapeKey } from './util.js';
import { addComments, checkQuantityOfComment } from './comments.js';

const COMMENTS_LOAD_COUNT = 5;

const modal = document.querySelector('.big-picture');

const picturesList = document.querySelector('.pictures');

const closeButton = modal.querySelector('.big-picture__cancel');

const loaderButton = modal.querySelector('.comments-loader');

let targetComments = [];
let currentCount = COMMENTS_LOAD_COUNT;
let totalCount;

// Передает данные выбранного объекта в модальное окно
const setModalData = ({ url, description, likes, comments }) => {
  modal.querySelector('.big-picture__img img').src = url;
  modal.querySelector('.big-picture__img img').alt = description;
  modal.querySelector('.likes-count').textContent = likes;
  modal.querySelector('.comments-count').textContent = comments.length;
  modal.querySelector('.social__caption').textContent = description;
};

// Чистит сккентарии
function cleanComments() {
  modal.querySelector('.social__comments').innerHTML = '';
}

cleanComments();

// Функция для события при нажатии на Esc
const onModalEscapeKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

// Функция для события при нажатии на Enter
const onPhotoEnterKeydown = (evt) => {
  if (isEnterKey(evt)) {
    if (evt.target.classList.contains('picture')) {
      evt.preventDefault();
      const photoId = evt.target.dataset.id;
      const photo = photos.find((item) => item.id === Number(photoId));
      openModal(photo);
    }
  }
};

// Закрывает модальное окно и сбрасывает данные об объекте
function closeModal () {
  modal.querySelector('.big-picture__img img').innerHTML = '';
  modal.querySelector('.likes-count').innerHTML = '';
  modal.querySelector('.comments-count').innerHTML = '';
  modal.querySelector('.social__caption').innerHTML = '';
  modal.querySelector('.social__comments').innerHTML = '';

  modal.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onModalEscapeKeydown);

  currentCount = COMMENTS_LOAD_COUNT;
}

// Открывает модальное окно
function openModal (photo) {
  document.body.classList.add('modal-open');
  modal.classList.remove('hidden');

  document.addEventListener('keydown', onModalEscapeKeydown);

  targetComments = photo.comments.slice();
  totalCount = targetComments.length;

  setModalData(photo);
  addComments(targetComments, 0, COMMENTS_LOAD_COUNT);
  checkQuantityOfComment(totalCount, currentCount);
}

// Событие на нажатие кнопки загрузки новых комментариев
loaderButton.addEventListener('click', () => {
  currentCount += COMMENTS_LOAD_COUNT;
  checkQuantityOfComment(totalCount, currentCount);

  addComments(targetComments, currentCount - COMMENTS_LOAD_COUNT, currentCount);
});

// Событие при нажатии на превью
picturesList.addEventListener('click', (evt) => {
  if (evt.target.closest('.picture')) {
    const photoId = evt.target.parentElement.dataset.id;
    const photo = photos.find((item) => item.id === Number(photoId));
    openModal(photo);
  }
});

picturesList.addEventListener('keydown', onPhotoEnterKeydown);

// Событие при нажатии на крестик в модальном окне
closeButton.addEventListener('click', () => {
  closeModal();
});

// Выбирает картинку при помощи Enter
closeButton.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closeModal();
  }
});