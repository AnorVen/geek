'use strict';

@@include('./Container.js')
@@include('./SearchSelectList.js')
@@include('./Basket.js')
@@include('./HeaderMenu.js')
@@include('./Products.js')


$(document).ready(function () {
  let searchList = new SearchSelectList();
  searchList.ajax();
  $('.search-select').append(searchList.render());


  let items = new Products();

  $('.FeturedItems__link').on('click', function (e) {
    e.preventDefault();
    items.ajax();
  })


/*
header-menu рендерится на php -т.к. в процессе работы оно не перестраивается.
let headerMenu = new HeaderMenu();
  headerMenu.ajax();

 */

  let basket = new Basket();
  $('.card__menu').append(basket.collectBasketItems());

  $('.product__btn').on('click', function () {
    let idProduct = parseInt($(this).attr('id').split('-')[1]);
    let price = parseFloat($(this).parents('.product__item').find('.product__price').text()
      .replace(/[^\d.]/g, ""));
    let src = $(this).parents('.product__item').find('.product__img').attr('src');
    let title = $(this).parents('.product__item').find('.product__text').text();
    let stars = parseInt($(this).attr('data-stars')) || 5;
    let quantity = 1;


    basket.add(idProduct, quantity, price, src, title, stars)
    // console.log(idProduct, quantity, price, src, title, stars);

  });



  $('#search-select__list li').on('click', function () {
    $('#search__select option').attr('value', this.innerHTML).text(this.innerHTML);
  });








@@include('./validations.js')

@@include('./sliders.js')


});