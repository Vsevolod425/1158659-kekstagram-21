'use strict';

(function () {
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
}());
