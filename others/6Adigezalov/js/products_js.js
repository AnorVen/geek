"use strict";

topMenu.init();
leftMenu.init();

let pageId = +window.location.search.replace('?id=', '');

$.ajax({
    url: './responses/productsData.json',
    type: 'GET',
    dataType: 'json',
    success: function (result) {
        let productsContainer = $('.single__product');
        let sliderContainer = $('.recommendation__item');
        for (let i = 0; i < result.length; i++) {
            if (result[i].id === pageId) {
                let product = new SingleProduct(result[i].id, result[i].title, result[i].image, result[i].price,
                    result[i].rating, 'single__product__img', 'single__product_title', 'product__rating',
                    'single__product_price', 'product__price_btn add_to_cart', result[i].description1,
                    result[i].description2, result[i].description3);
                productsContainer.append(product.render());
            }
            // Вывод рекомендованого товара
            if (result[i].hit === 1) {
                let product = new RecommendationProduct(result[i].id, result[i].title, result[i].image);
                sliderContainer.append(product.render())
            }
        }
    }
});

$(document).ready(function () {
    $('.tab__item').on('click', 'li:not(.active)', function () {
        $(this).addClass('active').siblings().removeClass('active');
        let tabs = $(this).closest('.tab').find('.tab__description');
        tabs.removeClass('active');
        tabs.eq($(this).index()).addClass('active');
    });

    $('.recommendation__item').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4
    });

    cart.init();
});