"use strict";

topMenu.init();
leftMenu.init();
cart.init();

$(document).ready(function () {
    const formButton = $('.form_btn');

    formButton.on('click', (event) => {
        event.preventDefault();

        let name = $('#name');
        let phone = $('#phone');
        let email = $('#email');
        let city = $('#city');

        validate(regName, name, '#helpBlockName', 'Имя может содержать только буквы.');
        validate(regPhone, phone, '#helpBlockPhone', 'Телефон должен иметь формат +Х(ХХХ)ХХХ-ХХХХ.');
        validate(regEmail, email, '#helpBlockEmail', 'Неверный формат email.');
        validate(regCity, city, '#helpBlockCity', 'Введите название города кириллицей');

        if (regName.test(name.val()) && regPhone.test(phone.val()) && regEmail.test(email.val()) && regCity.test(city.val())) {
            $.ajax({
                url: './responses/callBackData.json',
                dataType: 'json',
                success: function (result) {
                    $('.main__content').html(result.userMessage);
                }
            });
        }
    });

    let answer = $('.answer');
    $.ajax({
        url: './responses/citiesData.json',
        type: 'GET',
        dataType: 'json',
        success: function (result) {
            $('#city').on('keyup', function () {
                answer.html('');
                let numChars = $(this).val().length;
                let city = $('#city');
                let pcre = new RegExp(city.val().toLowerCase());

                if (numChars >= 3) {
                    for (let i = 0; i < result.length; i++) {
                        if (pcre.test(result[i].name.toLowerCase())) {
                            $('.answer').append(
                                $('<li/>', {'class': 'city_select', 'data-id': result[i].id}).html(result[i].name)
                                    .on('click', function () {
                                        city.val(result[i].name);
                                        answer.html('');
                                    })
                            )
                        }
                    }
                }
            });
        }
    });
});