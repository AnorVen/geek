"use strict";

let pageId = +window.location.search.replace('?id=', '');

topMenu.init();
leftMenu.init();

$.ajax({
    url: './responses/productsData.json',
    type: 'GET',
    dataType: 'json',
    success: function (result) {
        let productsContainer = $('.main__content');
        for (let i = 0; i < result.length; i++) {
            if (result[i].category_id === pageId) {
                let product = new ProductCart(result[i].id, result[i].title, result[i].image, result[i].price, result[i].rating,
                    'col-md-3 col-sm-6 col-xs-6 product', 'product__img', 'product__name', 'product__rating', 'product__price',
                    'product__price_btn add_to_cart', 'products.html?id=' + result[i].id);
                productsContainer.append(product.render());
            }
        }
    }
});

$(document).ready(function () {
    dragDrop.init();
    cart.init();
});