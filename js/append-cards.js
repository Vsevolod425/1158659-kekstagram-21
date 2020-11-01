'use strict';

(function () {
  const loadCards = function (cards) {
    const pictureTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);
    let fragment = new DocumentFragment();

    for (let i = 0; i < cards.length; i++) {
      let copyPicture = pictureTemplate.cloneNode(true);
      copyPicture.querySelector(`.picture__img`).src = cards[i].url;
      copyPicture.querySelector(`.picture__likes`).textContent = cards[i].likes;
      copyPicture.querySelector(`.picture__comments`).textContent = cards[i].comments.length;
      fragment.appendChild(copyPicture);
    }

    const pictureList = document.querySelector(`.pictures`);
    pictureList.appendChild(fragment);
  };
  window.load(loadCards);
}());
