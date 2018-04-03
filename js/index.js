'use strict';

@@include('./Container.js')
@@include('./SearchSelectList.js')
@@include('./Basket.js')
@@include('./HeaderMenu.js')
@@include('./Products.js')
@@include('./comment.js')


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

  $('#search-select__list li').on('click', function () {
    $('#search__select option').attr('value', this.innerHTML).text(this.innerHTML);
  });


  let basket = new Basket();

  $('.card__menu').append(basket.collectBasketItems());

  //$('.product__btn').on('click', function () {


function addToCard() {
    console.log(1);
    let idProduct = parseInt($(this).attr('id').split('-')[1]);
    let price = parseFloat($(this).parents('.product__item').find('.product__price').text()
      .replace(/[^\d.]/g, ""));
    let src = $(this).parents('.product__item').find('.product__img').attr('src');
    let title = $(this).parents('.product__item').find('.product__text').text();
    let stars = parseInt($(this).attr('data-stars')) || 5;
    let quantity = 1;


    basket.add(idProduct, quantity, price, src, title, stars)
    // console.log(idProduct, quantity, price, src, title, stars);

  }

  function addToCardSingle() {
    console.log(1);
    let idProduct = parseInt($(this).attr('id').split('-')[1]);
    let price = parseFloat($(this).parents('.info').find('.info__price').text()
      .replace(/[^\d.]/g, ""));
    let src = $(this).parents('.main').find('.product__img').attr('src');
    let title = $(this).parents('.info').find('.info__title').text();
    let stars = parseInt($(this).attr('data-stars')) || 5;
    let quantity = $(this).parents('.info').find('input.choose__quantity').val() || 1;


    basket.add(idProduct, quantity, price, src, title, stars)
    // console.log(idProduct, quantity, price, src, title, stars);

  }
   /* function addToCard(e) {
    console.log(1);
    let idProduct = parseInt($(e.target).attr('id').split('-')[1]);
    let price = parseFloat($(e.target).parents('.product__item').find('.product__price').text()
      .replace(/[^\d.]/g, ""));
    let src = $(e.target).parents('.product__item').find('.product__img').attr('src');
    let title = $(e.target).parents('.product__item').find('.product__text').text();
    let stars = parseInt($(e.target).attr('data-stars')) || 5;
    let quantity = 1;


    basket.add(idProduct, quantity, price, src, title, stars)
    // console.log(idProduct, quantity, price, src, title, stars);

  }*/

  $('body').on('click', '.product__btn', addToCard);
  $('body').on('click', '.choosr__btn', addToCardSingle);
  $('body').on('click', '.result__btn', addToCard);




      $('.product__item').draggable(
        {
          addClasses: false,
          revert: true,
          stack: ".product__item",
          start: function () {
            $(this).css({'transform': 'scale(0.5)'})

          },
          stop: function () {
            $(this).css({'transform': 'scale(1)'})
            $(this).addToCard();

          }
        }
      );
      $( ".droppable" ).droppable({
        accept: ".product__item",
        classes: {
          "ui-droppable-active": "ui-state-active",
          "ui-droppable-hover": "ui-state-hover"
        },
        drop: this.addToCard

      })




      window.addEventListener('load', () => {
        const comments = new Comments('#comments', '#add-comment', '#add-comment');
      });


@@include('./validations.js')

@@include('./sliders.js')
});

