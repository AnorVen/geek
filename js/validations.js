let regExpMail = /.+@.+\.[a-z]{2,6}/i;
let regExpName = /^([а-яё]{1,})|([a-z]{1,})$/i;
let regExpPas = /.{6,}/i;
let regExpPhone = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/i;



let mailFprm = $('.subscribe__form');
mailFprm.on('submit',  function(e) {
  e.preventDefault();
  let value = mailFprm.children('input[name=mail]').val();
  console.log(value);
  if (regExpMail.test(value)) {
    mailFprm.children('.error').remove();
    this.submit();

    return true;
  } else {
    mailFprm.children('.error').remove();
    mailFprm.append('<p class="error"> почта введена не верно </p>');
    return false;
  }
});


/*
function showError(container, errorMessage) {
    container.className = 'error';
    var msgElem = document.createElement('span');
    msgElem.className = "error-message";
    msgElem.innerHTML = errorMessage;
    container.appendChild(msgElem);
  }

  function resetError(container) {
    container.className = '';
    if (container.lastChild.className == "error-message") {
      container.removeChild(container.lastChild);
    }
  }

  function validate(form) {
    var elems = form.elements;

    resetError(elems.from.parentNode);
    if (!elems.from.value) {
      showError(elems.from.parentNode, ' Укажите от кого.');


      console.log(1)
      return false
    }

    resetError(elems.password.parentNode);
    if (!elems.password.value) {
      showError(elems.password.parentNode, ' Укажите пароль.');
      console.log(2)
      return false
    } else if (elems.password.value != elems.password2.value) {
      showError(elems.password.parentNode, ' Пароли не совпадают.');
      console.log(3)
      return false
    }

    resetError(elems.to.parentNode);
    if (!elems.to.value) {
      showError(elems.to.parentNode, ' Укажите, куда.');
      console.log(4)
      return false
    }

    resetError(elems.message.parentNode);
    if (!elems.message.value) {
      showError(elems.message.parentNode, ' Отсутствует текст.');
      console.log(5)
      return false
    }
    console.log(6)

  }

  */