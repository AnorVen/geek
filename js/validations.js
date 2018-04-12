let regExpMail = /.+@.+\.[a-z]{2,6}/i;
let regExpName = /^([а-яё]{1,})|([a-z]{1,})$/i;
let regExpPas = /.{6,}/i;
let regExpPhone = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/i;

//////----------   при отслеживании submit форма валидируется, но после срабатывает опять submit
/* и событие попадает в бесконечный цыкл.. приходится отслеживать клик по кнопке, а потом запускать
submit. ниже пример для главной.
/*
function mailValidation(self) {
  let value = self.children('input[name=mail]').val();
  console.log(value);
  if (regExpMail.test(value)) {
    self.children('.error').remove();
    return true;
  } else {
    self.children('.error').remove();
    self.append('<p class="error"> почта введена не верно </p>');
    return false;
  }
}

let mailFprm = $('.subscribe__form');
mailFprm.on('submit', function (e) {
  e.preventDefault();
  if (mailValidation($(this))) {
    this.submit();
  };
});
*/
function mailValidation(self, type) {
  let value = self.parent('form').children('input[name=' + type + ']').val();

  let regExpText;
  switch (type) {
    case 'mail':
      regExpText = regExpMail;
      break;
    case 'name':
      regExpText = regExpName;
      break;
    case 'pas':
      regExpText = regExpPas;
      break;
    default:
      regExpText = regExpPhone;
      break;
  }
  if (regExpText.test(value)) {
    self.parent('form').children('.error').remove();
    return true;
  } else {
    self.parent('form').children('.error').remove();
    self.parent('form').append('<p class="error"> почта введена не верно </p>');
    return false;
  }
}

let mailFprm = $('.subscribe__submit');
mailFprm.on('click', function (e) {
  e.preventDefault();
  if (mailValidation($(this), 'mail')) {
    $(this).parent('form').submit();
  };
});

let alreadyRegisted = $('.alreadyRegisted__submit');
alreadyRegisted.on('click', function (e) {
  e.preventDefault();
  if (mailValidation($(this), 'pas') && mailValidation($(this), 'mail')) {
    $(this).parent('form').submit();
    console.log('ok')
  };
});





