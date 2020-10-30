'use strict';

(function () {
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
  window.gallery = {
    generateCards
  };
}());
