'use strict';

@@include('./jquery-3.3.1.js')
@@include('./jquery-ui.js')
@@include('./owl.carousel.min.js')
@@include('./jQAllRangeSliders-min.js')

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
  });


  let headerMenu = new HeaderMenu();
  headerMenu.ajax();


  $('#search-select__list li').on('click', function () {
    $('#search__select option').attr('value', this.innerHTML).text(this.innerHTML);
  });


  let basket = new Basket();

  $('.card__menu').append(basket.collectBasketItems());
  let shoppingCart = $('section').is('.shopping-cart');
  if (shoppingCart) {
    let basketShoppingCart = new Basket();
    $('.cart__items').append(basketShoppingCart.collectCartItems());
  }


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



  basket.add(idProduct, quantity, price, src, title, stars);

  }

  let main = $('div').is('.index');
  if(main){
    $('body').on('click', '.product__btn', addToCard);
  }
  let product = $('div').is('.product');
  if(product){
    $('body').on('click', '.choosr__btn', addToCardSingle);
  }




  $('body').on('click', '.result__btn', addToCard);


  const dragDrop = {
    init() {
      this.createDragDrop();
    },

    createDragDrop() {
      $('.product__item').draggable({
        helper: 'clone',
        revert: 'invalid'
      });
      $('.header__top-wrap.droppable').droppable({
        activeClass: 'ui-state-active',
        hoverClass: 'ui-state-hover',
        tolerance: 'touch',
        opacity: 0.1,
        over: function (event, ui) {
          let clone = ui.draggable.clone();
          clone.prevObject.find('.product__btn').click();
        }
      });
    }
  };
  dragDrop.init();


  let comments = $('div').is('#comments');
  if (comments) {
    new Comments('#comments', '#add-comment',
      '#comment-input', '#single-stars', '#comment-name');
  };

  ///////////////////------------
  /// попробовал сделать сортировку.. но кажется это лучше делать
  // через ррендер и через сортировку данных из ajax
  /*
  let productProduction = $('section').is('.productProduction');

  function sortByName() {
      let productItem = document.querySelectorAll('.product__item');
      let newArr = []
      for(let i = 0; i < productItem.length; i++){
        newArr.push(productItem[i].innerHTML)
      }
    for (let i = 0; i < productItem.length - 1; i++) {
      for (let j = 0; j < productItem.lenth - 1 - i; j++) {

        // var b = a[1].childNodes[3].childNodes[1]
        if (productItem[j + 1].childNodes[3].childNodes[1].innerHTML < productItem[j].childNodes[3].childNodes[1].innerHTML) {
          let t = newArr[j + 1];
          newArr[j + 1] = newArr[j];
          newArr[j] = t;
        }
      }


    }
    console.log(newArr);
  }

  if (productProduction) {
    $('#sortBy').on('click', function () {
      sortByName();

    });

  }
*/

  let delivery = $('section').is('.delivery');
  if (delivery) {

  };




@@include('./validations.js')
@@include('./sliders.js')




});

