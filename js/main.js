'use strict';

const DECIMAL_SYSTEM = 10;
const GENERATED_CARDS_AMOUNT = 25;
const GENERATED_COMENTS_AMOUNT = 4;

const descriptionList = [
  `Неродные просторы`,
  `Местная растительность`,
  `Дорога на север`,
  `Мост дьявола`
];

const userNames = [
  `Андрей`,
  `Алексей`,
  `Мария`,
  `Наталья`,
  `Олег`
];

const userComments = [
  `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
  `В целом всё неплохо. Но не всё.`,
  `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
  `Всё отлично!`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
  `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`
];

const getRandomElement = function (array) {
  let randomElement = array[parseInt(Math.random() * array.length, DECIMAL_SYSTEM)];
  return randomElement;
};

const getUserComment = function () {
  let cards = [];
  for (let i = 0; i <= GENERATED_COMENTS_AMOUNT; i++) {
    cards.push(
        {
          avatar: `img/avatar - ` + Math.random() * userComments.length + `.svg`,
          message: getRandomElement(userComments),
          name: getRandomElement(userNames)
        });
  }
  return cards;
};

const getLikeCounter = function (min, max) {
  let count = Math.random() * (max - min);
  return parseInt(count + 1, DECIMAL_SYSTEM);
};

const generateCards = function () {
  let cardItem = [];
  for (let i = 0; i <= GENERATED_CARDS_AMOUNT; i++) {
    cardItem.push({
      'avatar': `photos/` + parseInt(Math.random() * GENERATED_CARDS_AMOUNT + 1, DECIMAL_SYSTEM) + `.jpg`,
      'description': getRandomElement(descriptionList),
      'likes': getLikeCounter(15, 200),
      'comments': getUserComment()
    });
  }
  return cardItem;
};

const pictureTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);
const fragment = new DocumentFragment();
const cards = generateCards();

for (let i = 0; i < cards.length; i++) {
  let copyPicture = pictureTemplate.cloneNode(true);
  copyPicture.querySelector(`.picture__img`).src = cards[i].avatar;
  copyPicture.querySelector(`.picture__likes`).textContent = cards[i].likes;
  copyPicture.querySelector(`.picture__comments`).textContent = cards[i].comments.length;
  fragment.appendChild(copyPicture);
}

const pictureList = document.querySelector(`.pictures`);
pictureList.appendChild(fragment);


const uploadFormButton = document.querySelector(`#upload-file`);
const formWindow = document.querySelector(`.img-upload__overlay`);
const closeFormButton = formWindow.querySelector(`.img-upload__cancel`);

let onPopupEscPress = function (evt) {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closePopup();
  }
};

let openPopup = function () {
  formWindow.classList.remove(`hidden`);
  document.addEventListener(`keydown`, onPopupEscPress);
};

let closePopup = function () {
  formWindow.classList.add(`hidden`);
  document.removeEventListener(`keydown`, onPopupEscPress);
  uploadFormButton.value = ``;
};

uploadFormButton.addEventListener(`change`, function () {
  openPopup();
});

closeFormButton.addEventListener(`click`, function () {
  closePopup();
});


const photoPreview = document.querySelector(`.img-upload__preview`);
const photoEffectList = document.querySelector(`.img-upload__effects`);
const effectPin = document.querySelector(`.effect-level__pin`);
const filterWidth = document.querySelector(`.effect-level__line`);
const filterCheckWidth = document.querySelector(`.effect-level__depth`);
let filterPhotoEffect = `none`;
let filterType = ``;
let filterUnits = ``;
let filterMinValue = 0;
let filterMaxValue = 0;
let oldPhotoEffect = ``;

const addPhotoEffect = function (evt) {
  filterPhotoEffect = evt.target.value;
  let currentPhotoEffect = `effects__preview--` + evt.target.value;
  photoPreview.classList.add(currentPhotoEffect);
  photoPreview.style.filter = ``;
  if (oldPhotoEffect !== ``) {
    photoPreview.classList.remove(oldPhotoEffect);
  }
  oldPhotoEffect = currentPhotoEffect;

  switch (evt.target.value) {
    case `chrome`:
      filterType = `grayscale`;
      filterUnits = ``;
      filterMinValue = 0;
      filterMaxValue = 1;
      break;
    case `sepia`:
      filterType = `sepia`;
      filterUnits = ``;
      filterMinValue = 0;
      filterMaxValue = 1;
      break;
    case `marvin`:
      filterType = `invert`;
      filterUnits = `%`;
      filterMinValue = 0;
      filterMaxValue = 100;
      break;
    case `phobos`:
      filterType = `blur`;
      filterUnits = `px`;
      filterMinValue = 0;
      filterMaxValue = 3;
      break;
    case `heat`:
      filterType = `brightness`;
      filterUnits = ``;
      filterMinValue = 1;
      filterMaxValue = 3;
      break;
    default:
      filterType = ``;
      filterUnits = ``;
      filterMinValue = 0;
      filterMaxValue = 0;
      break;
  }
};

photoEffectList.addEventListener(`change`, addPhotoEffect);

effectPin.addEventListener(`mouseup`, function () {
  if (filterPhotoEffect === `none`) {
    photoPreview.style.filter = ``;
  } else {
    photoPreview.style.filter = `${filterType}(${photoEffectProportion()}${filterUnits})`;
  }
});

const photoEffectProportion = function () {
  let photoEffectAttitude = (filterMaxValue - filterMinValue) / (filterWidth.clientWidth / filterCheckWidth.clientWidth) + filterMinValue;
  return photoEffectAttitude;
};


const uploadForm = document.querySelector(`#upload-select-image`);
const hashTagsInput = uploadForm.querySelector(`.text__hashtags`);
const re = /^#[\w]{1,19}$/;

hashTagsInput.addEventListener(`input`, function () {
  let hashTagsItem = hashTagsInput.value.trim().toLowerCase().split(` `);

  const hashTagsValidity = function (value) {
    return re.test(value);
  };
  const hashTagsCheck = hashTagsItem.every(hashTagsValidity);

  if (!hashTagsCheck) {
    hashTagsInput.setCustomValidity(`Ошибка ввода`);
  } else if (hashTagsItem.length > 5) {
    hashTagsInput.setCustomValidity(`Превышено допустимое количество тегов`);
  } else {
    hashTagsInput.setCustomValidity(``);
  }
});
