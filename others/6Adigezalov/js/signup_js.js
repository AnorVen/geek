"use strict";

topMenu.init();
leftMenu.init();
cart.init();

$(document).ready(function () {
    $('#birthday').datepicker({
        firstDay: 1,
        dayNamesMin: [ "ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ" ],
        dateFormat:'dd-mm-yy'
    });

    const formButton = $('.form_btn');
    formButton.on('click', (event) => {
        event.preventDefault();
        let name = $('#name');
        let phone = $('#phone');
        let email = $('#email');
        let birthday = $('#birthday');

        validate(regName, name, '#helpBlockName', 'Имя может содержать только буквы.', 'pulsate');
        validate(regPhone, phone, '#helpBlockPhone', 'Телефон должен иметь формат +Х(ХХХ)ХХХ-ХХХХ.', 'pulsate');
        validate(regEmail, email, '#helpBlockEmail', 'Неверный формат email.', 'pulsate');
        validate(regDate, birthday, '#helpBlockBirthday', 'Неверный формат.', 'pulsate');

        if (regName.test(name.val()) && regPhone.test(phone.val()) && regEmail.test(email.val()) && regDate(birthday.val())) {
            $.ajax({
                url: './responses/registerUser.json',
                dataType: 'json',
                success: function (result) {
                    $('.main__content').html(result.userMessage);
                }
            });
        }
    });
    $.ajax({
        url: './responses/citiesData.json',
        dataType: 'json',
        type: 'GET',
        success: function (result) {
            for (let i = 0; i < result.length; i++) {
                $('select#city').append(
                    $('<option/>', {'value': result[i].name}).html(result[i].name)
                )
            }
        }
    });
});