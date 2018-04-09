"use strict";

topMenu.init();
leftMenu.init();
cart.init();
reviews.init();

$(document).ready(function () {
    let reviewsContainer = $('.reviews__container');

    $('.form_btn').on('click', function (event) {
        event.preventDefault();
        let name = $('#name');
        validate(regName, name, '#helpBlockName', 'Имя может содержать только буквы.', 'pulsate', true, '.dialog');
        if (regName.test(name.val())) {
            reviews.addNewReview();
        }
    });

    reviewsContainer.on('click', '.del_review_btn', function () {
        let reviewId = $(this).attr('data-id');
        reviews.delReview(reviewId);
    });

    reviewsContainer.on('click', '.mod_review_btn', function () {
        let reviewId = $(this).attr('data-id');
        reviews.modReview(reviewId);
    });
});