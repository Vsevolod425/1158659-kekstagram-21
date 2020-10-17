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

//Окно редактирования изображения

const uploadFile = document.querySelector(`#upload-file`);
const openForm = document.querySelector(`.img-upload__overlay`);
const closeForm = openForm.querySelector(`.img-upload__cancel`);

uploadFile.addEventListener(`change`, function () {
  openForm.classList.remove(`hidden`);
});

const onPopupEscPress = function (evt) {
  if (evt.key === `Escape`) {
    closePopup();
  }
};

const closePopup = function () {
  openForm.classList.add(`hidden`);
  document.addEventListener(`keydown`, onPopupEscPress);
  uploadFile.value = ``;
};

closeForm.addEventListener(`click`, function () {
  closePopup();
});

//Наложение эффекта на фото

const photoPreview = document.querySelector(`.img-upload__preview`);
const photoEffectList = document.querySelector(`.img-upload__effects`);
const effectPin = document.querySelector(`.effect-level__pin`);
const effectFilter = document.querySelector(`.img-upload__preview`);
const filterWidth = document.querySelector(`.effect-level__line`);
const filterCheckWidth = document.querySelector(`.effect-level__depth`);
const filterType = ``;
const filterUnits = ``;
const filterMinValue = 0;
const filterMaxValue = 0;
const presentFilterValue = ``;

const oldPhotoEffect = ``;

const addPhotoEffect = function (evt) {
  const currentPhotoEffect = `effects__preview--` + evt.target.value;
  photoPreview.classList.add(currentPhotoEffect);
  if (oldPhotoEffect !== ``) {
    photoPreview.classList.remove(oldPhotoEffect);
  }
  oldPhotoEffect = currentPhotoEffect;

  switch (evt.target.value) {
    case `none`:
      filterType = ``;
      filterUnits = ``;
      filterMinValue = 0;
      filterMaxValue = 0;
      break;
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
  }

  presentFilterValue = (evt.target.value === `none`) ? effectFilter.style.filter = `` :
    effectFilter.style.filter = filterType + `(` + filterMaxValue + filterUnits + `)`;
};

photoEffectList.addEventListener(`change`, addPhotoEffect);

effectPin.addEventListener(`mouseup`, function (evt) {
  presentFilterValue = (evt.target.value === `none`) ? effectFilter.style.filter = `` :
    effectFilter.style.filter = filterType + `(` + photoEffectProportion() + filterUnits + `)`;
});

const photoEffectProportion = function () {
  const photoEffectAttitude = (filterMaxValue - filterMinValue) / (filterWidth.clientWidth / filterCheckWidth.clientWidth) + filterMinValue;
  return photoEffectAttitude;
};

//Валидация хештегов


