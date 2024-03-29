import { isEscapeKey } from './util.js';
import { resetScale } from './scale.js';
import { hashtagsInput } from './validator.js';
import { resetEffects, preview } from './effects.js';
import { getImage } from './upload-image.js';

const uploadInput = document.querySelector('.img-upload__input');

const modal = document.querySelector('.img-upload__overlay');

const closeBtn = modal.querySelector('.cancel');

const descriptionInput = modal.querySelector('.text__description');

const resetForm = () => {
  uploadInput.value = '';
  hashtagsInput.value = '';
  descriptionInput.value = '';
  resetScale();
  resetEffects();
};

const openModal = () => {
  modal.classList.remove('hidden');
  document.addEventListener('keydown', onModalEscapeKeydown);
  hashtagsInput.addEventListener('keydown', onFieldEscKeydown);
  descriptionInput.addEventListener('keydown', onFieldEscKeydown);
  document.body.classList.add('modal-open');
  getImage(uploadInput, preview);
  resetEffects();
};

const closeModal = () => {
  modal.classList.add('hidden');
  resetForm();
  document.removeEventListener('keydown', onModalEscapeKeydown);
  document.body.classList.remove('modal-open');
};

uploadInput.addEventListener('change', () => {
  openModal();
});

closeBtn.addEventListener('click', () => {
  closeModal();
});

function onFieldEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
}

function onModalEscapeKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
}

export { modal, closeModal, onModalEscapeKeydown };
