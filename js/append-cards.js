'use strict';

(function () {
  const pictureTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);
  const fragment = new DocumentFragment();
  const cards = window.gallery.generateCards();

  for (let i = 0; i < cards.length; i++) {
    let copyPicture = pictureTemplate.cloneNode(true);
    copyPicture.querySelector(`.picture__img`).src = cards[i].avatar;
    copyPicture.querySelector(`.picture__likes`).textContent = cards[i].likes;
    copyPicture.querySelector(`.picture__comments`).textContent = cards[i].comments.length;
    fragment.appendChild(copyPicture);
  }

  const pictureList = document.querySelector(`.pictures`);
  pictureList.appendChild(fragment);
}());
