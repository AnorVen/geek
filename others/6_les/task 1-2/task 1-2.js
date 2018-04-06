// Календарь

$(document).ready(function () {
  $('#datepicker').datepicker({
    firstDay: 1,
    dateFormat: 'dd.mm.yy',
    showOtherMonths: true,
    selectOtherMonths: true,
    changeMonth: true,
    changeYear: true,
    defaultDate: '-18y',
    yearRange: '1940:2018',
    dayNamesMin: ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'],
    monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
  });
});


// Автокомплит - города

(function ($) {
  $(function () {
    $('#citieName').on('input', function () {
      var citieNamePart = $(this).val();
      if (citieNamePart.length >= 2) {
        $('#citiesList option').remove();
        $.get('http://geoapi.spacenear.ru/api.php?method=getCities&countryId=1&pattern=' + citieNamePart, function (data) {
          var result = JSON.parse(data);
          for (var i = 0; i < result.length; i++) {
            $('<option>', {
              text: result[i].name
            }).appendTo('#citiesList');
          }
        });
      }
    })
  });
})(jQuery);

// Валидация формы
/* 
  "Колхозный" метод валидации получился, с несовсем удачой логикой,
  1-ая весия была написана на vanilla js,
  потом дорабатывалась уже с jQuery.
*/
function validation() {
// отмена отправки
$('#btn1').submit(function(){
  return false;
  });

  var doc = document,
    valueName = doc.getElementById('name').value,
    valueDate = doc.getElementById('datepicker').value,
    valueTel = doc.getElementById('tel').value,
    valueMail = doc.getElementById('mail').value;
  // RegExp для имени
  if (/^[a-zа-яё]{2,}$/i.test(valueName) === true) {
    // для даты рождения
    if (/\d{2}\.\d{2}\.\d{4}/.test(valueDate) === true) {
      // для телефона
      if (/\+?\d{1,3}\(?\s?\d{3}\s?\)?\d{3}-?\s?\d{4}/.test(valueTel) === true) {
        // для E-mail
        if (/(^\w+(|(\.|\-)\w+))(?=@[a-z]{2,}\.[a-z]{2,4}\b)/i.test(valueMail) === true) {
          alert('отправлено');
        } else
          var mail = doc.getElementById('mail');
        mail.classList.add('err');
        $(mail).effect('shake', {
          times: 4,
          distance: 2
        }, 'fast');
        $('#dialog').dialog({
          modal: true,
          buttons: [{
            text: "Испарвить",
            icon: "ui-icon-check",
            click: function () {
              $(this).dialog("close");
              $(mail).focus();
            }
          }]
        }).text('формат почты неверный');
        mail.oninput = function () {
          mail.classList.remove('err');
        }
      } else
        var tel = doc.getElementById('tel');
      tel.classList.add('err');
      $(tel).effect('shake', {
        times: 4,
        distance: 2
      }, 'fast');
      $('#dialog').dialog({
        modal: true,
        buttons: [{
          text: "Испарвить",
          icon: "ui-icon-check",
          click: function () {
            $(this).dialog("close");
            $(tel).focus();
          }
        }]
      }).text('формат телефона неверный');
      tel.oninput = function () {
        tel.classList.remove('err');
      }
    } else
      var date = doc.getElementById('datepicker');
    date.classList.add('err');
    $(date).effect('shake', {
      times: 4,
      distance: 2
    }, 'fast');
    $('#dialog').dialog({
      modal: true,
      buttons: [{
        text: "Испарвить",
        icon: "ui-icon-check",
        click: function () {
          $(this).dialog("close");
          $(date).focus();
        }
      }]
    }).text('формат даты неверный');
    date.onfocus = function () {
      date.classList.remove('err');
    }
  } else
    var name = doc.getElementById('name');
  name.classList.add('err');
  $(name).effect('shake', {
    times: 4,
    distance: 2
  }, 'fast');
  $('#dialog').dialog({
    modal: true,
    buttons: [{
      text: "Испарвить",
      icon: "ui-icon-check",
      click: function () {
        $(this).dialog("close");
        $(name).focus();
      }
    }]
  }).text('формат имени неверный');
  name.oninput = function () {
    name.classList.remove('err');
  }
}