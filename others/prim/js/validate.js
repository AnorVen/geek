"use strict";

let regName = /^[A-Za-zА-Яа-яёЁ]+$/i;
let regPhone = /^\+\d{1}\(\d{3}\)\d{3}-\d{4}$/;
let regEmail = /^([a-z0-9-_]+\.)*[a-z0-9-_]+@[a-z0-9-_]+(\.[a-z0-9-_]+)*\.[a-z]{2,6}$/;
let regCity = /^[А-Яа-яЁё-]+$/i;
let regDate = /^\d{2}-\d{2}-\d{4}$/;

function validate(reg, input, helpBlockId, textError, effect = false, dialog = false, dialogClass) {
    let helpBlock = $(helpBlockId);
    if (!reg.test(input.val())) {
        if (effect) {
            input.effect(effect, {}, 2000);
        }
        input.val('');
        input.parent().removeClass('has-success');
        input.parent().addClass('has-error');
        if (dialog) {
            $(dialogClass).dialog({})
        }
        helpBlock.html(textError);
}
    if (reg.test(input.val())) {
        input.parent().removeClass('has-error');
        input.parent().addClass('has-success');
        helpBlock.html('');
    }
}