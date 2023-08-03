const ALERT_SHOW_TIME = 3000;

// генерация случайных неповоторяющихся чисел
const createRandomId = (min, max) => {
  const ArrayOfRandomId = [];

  return function () {
    let currentId = getRandomInteger(min, max);

    if (ArrayOfRandomId.length >= (max - min + 1)) {
      return null;
    }

    while (ArrayOfRandomId.includes(currentId)) {
      currentId = getRandomInteger(min, max);
    }

    ArrayOfRandomId.push(currentId);

    return currentId;
  };
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

const isEnterKey = (evt) => evt.key === 'Enter';

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export{
  getRandomInteger,
  createRandomId,
  getRandomArrayElement,
  isEscapeKey,
  isEnterKey,
  showAlert
};
