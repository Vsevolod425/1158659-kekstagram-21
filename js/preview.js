'use strict';

(function () {
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
}());
