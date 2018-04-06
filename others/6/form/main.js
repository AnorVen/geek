'use strict';

function isValidName(name) {
  let regName = /^[A-Za-zА-Яа-я\s]{1,50}$/g;
  return regName.test(name);
}

function isValidPhone(tel) {
  let phone = /\+7\([\d]{3}\)[\d]{3}-[\d]{4}/;
  return phone.test(tel);
}

function isValidEMail(email) {
  let regEmail = /^([a-z0-9-_]+\.)*[a-z0-9-_]+@[a-z0-9-_]+(\.[a-z0-9-_]+)*\.[a-z]{2,6}$/i;
  return regEmail.test(email);
}

function getRedBorder(elem) {
  elem.animate({
    borderBottomColor: '2px solid rgb(255, 0, 0)',
    borderLeftColor: '2px solid rgb(255, 0, 0)',
    borderRightColor: '2px solid rgb(255, 0, 0)',
    borderTopColor: '2px solid rgb(255, 0, 0)'
  }, 500);
}

function getGreyBorder(elem) {
  elem.animate({
    borderBottomColor: '2px solid rgb(130, 130, 130)',
    borderLeftColor: '2px solid rgb(130, 130, 130)',
    borderRightColor: '2px solid rgb(130, 130, 130)',
    borderTopColor: '2px solid rgb(130, 130, 130)'
  }, 500);
}

function getError(elem, errorName) {
  $(errorName).dialog({
    closeOnEscape: true,
    position: {my: "left top", at: "left bottom", of: elem},
    show: { effect: "blind", duration: 800 },
    minHeight: 20,
    width: 460
  });
}

$(document).ready(function() {
  $('#date').datepicker({
    dateFormat: "dd.mm.yy",
    firstDay: 1
  });
  const $form = $('#input-form');
  $form.on('submit', function(e) {
    e.preventDefault();
    const $arrError = [];
    const $name = $('#name');
    const $phone = $('#phone');
    const $eMail = $('#e-mail');
    const $date = $('#date');
    const $inputArea = $('#inputArea');   

    if (!isValidName($name.val())) {
      const errorName = '.error-name';     
      getRedBorder($name);
      getError($name, errorName)
      $arrError.push($name);
    } else {
      const errorName = '.error-name';
      if ($(errorName).dialog('isOpen')) $(errorName).dialog('close');
      getGreyBorder($name);
    }

    if (!isValidPhone($phone.val())) {
      const errorPhone = '.error-phone';      
      getRedBorder($phone);
      getError($phone, errorPhone)
      $arrError.push($phone);
    } else {
      const errorPhone = '.error-phone';
      if ($(errorPhone).dialog('isOpen')) $(errorPhone).dialog('close');
      getGreyBorder($phone);
    }
    
    if (!isValidEMail($eMail.val())) {
      const errorEmail = '.error-email';      
      getRedBorder($eMail);
      getError($eMail, errorEmail)
      $arrError.push($eMail);
    } else {
      const errorEmail = '.error-email'; 
      if ($(errorEmail).dialog('isOpen')) $(errorEmail).dialog('close');
      getGreyBorder($eMail);
    }

    if ($date.val().length === 0) {
      const errorDate = '.error-date';      
      getRedBorder($date);
      getError($date, errorDate)
      $arrError.push($date);
    } else {
      const errorDate = '.error-date';
      if ($(errorDate).dialog('isOpen')) $(errorDate).dialog('close');
      getGreyBorder($date);
    }

    if ($inputArea.val().length === 0) {
      const errorArea = '.error-area';      
      getRedBorder($inputArea);
      getError($inputArea, errorArea)
      $arrError.push($inputArea);
    } else {
      const errorArea = '.error-area';  
      if ($(errorArea).dialog('isOpen')) $(errorArea).dialog('close');
      getGreyBorder($inputArea);
    }

    if (!$arrError.length) {
      $form.submit();
    };

  });
})