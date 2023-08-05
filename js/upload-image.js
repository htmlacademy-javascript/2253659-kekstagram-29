const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const getImage = (input, image) => {
  const file = input.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const imageUrl = URL.createObjectURL(file);
    image.src = imageUrl;

    const smallImages = document.querySelectorAll('.effects__preview');

    smallImages.forEach((item) => {
      item.style.backgroundImage = `url(${imageUrl})`;
    });
  }
};

export { getImage };
