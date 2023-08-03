import { preview } from './effects.js';

const SCALABLE_VALUE = 25;

const MIN_SCALE_VALUE = 25;

const MAX_SCALE_VALUE = 100;

const modal = document.querySelector('.img-upload__overlay');

const scaleInput = modal.querySelector('.scale__control--value');

const scaleControlSmaller = modal.querySelector('.scale__control--smaller');

const scaleControlBigger = modal.querySelector('.scale__control--bigger');

let currentScaleValue = MAX_SCALE_VALUE;

const setPreviewScale = (value) => {
  scaleInput.value = `${value}'%`;
  preview.style.transform = `scale(${value}%)`;
  currentScaleValue = value;
};

const resetScale = () => setPreviewScale(MAX_SCALE_VALUE);

scaleControlSmaller.addEventListener('click', () => {
  if (currentScaleValue >= MIN_SCALE_VALUE + SCALABLE_VALUE) {
    currentScaleValue -= SCALABLE_VALUE;
    setPreviewScale(currentScaleValue);
  }
});

scaleControlBigger.addEventListener('click', () => {
  if (currentScaleValue <= MAX_SCALE_VALUE - SCALABLE_VALUE) {
    currentScaleValue += SCALABLE_VALUE;
    setPreviewScale(currentScaleValue);
  }
});

export { resetScale };
