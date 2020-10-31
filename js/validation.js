'use strict';

(function () {
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
}());
