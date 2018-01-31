'use strict';
$("#slider").rangeSlider({
  bounds: {min: 52, max: 400},
  defaultValues: {min: 80, max: 200}
});

class Container {
  Constructor() {
    this.id = '';
    this.className = '';
    this.htmlCode = '';

  }
  render() {
    return this.htmlCode;
  }
}

class SearchSelectList extends Container {
  Constructor(my_id, my_class) {
    this.id = my_id;
    this.className = my_class;
    this.items = [];
    this.ajax();
  }

  render() {
    let result = '<ul class="' + this.className + '" id="' + this.id + '">';
    let items = this.items;
    items.forEach(function (item) {
      result += '<li class="' + item.class + '" data-value=' + item.data + ' >' + item.name + '</li>';
    });
    /* for( let i = 0, i < this.items.length; i++){
       result += i
     }*/

    result += '</ul>';
    return result;
  }

  ajax() {
    $.ajax({
      url: './js/json/search.json',
      dataType: 'json',
      async: false,
      success: function (data) {
        this.id = data.list.id;
        this.className = data.list.class;
        let a = [];
        for (let i = 0; i < data.menuItems.length; i++) {
          a.push(data.menuItems[i]);

        }
        this.items = a;
        /*
        for(let index in data.menuItems) {
          this.items.push(index)
        }
*/
        this.render();
      },
      context: this
    });
  }
}

class Basket extends Container {
  Constructor() {
    this.countGoods = 0;
    this.amount = 0;
    this.basketItems = [];
  }

  collectBasketItems(root) {
    $.get({
      url: './js/json/basket.json',
      dataType: 'json',
      success: function (data) {
        let quantity = 0;
        let b = function () {

          for (let i = 0; i < data.basket.length; i++) {
            quantity += +data.basket[i]['quantity'];
          }
          return quantity;

        };
        this.countGoods = b();

        this.amount = data.amount;

        let a = [];
        for (let i = 0; i < data.basket.length; i++) {
          a.push(data.basket[i]);

        }
        this.basketItems = a;
// по непонятной причине for.. in не проходит.
        /*
        for (let index in data.basket) {
          console.log(data.basket[index]);
          this.basketItems.push(data.basket[index]);
        }
*/
        this.render(root);
        this.refresh();
      },
      context: this
    });
  }

  render() {
    let basketDiv = $('#card__menu');

    let basketItemsDiv = $('<div />', {
      id: 'purchase__list',
      class: 'purchase__list'
    });

    let basketData = $('<div />', {
      id: 'basket_data',
      class: 'card__total-price total-price'
    });

    let basketLink = $('<div />', {
      class: 'card__link',
      id: 'card__link'
    });

    basketDiv.empty();
    basketDiv.append(basketItemsDiv);
    basketDiv.append(basketData);
    basketDiv.append(basketLink);
    basketLink.append('<div class="card__checkout"><a href="#">Checkout</a></div><div class="card__go-to-card"><a href="#">Go to card</a></div>');

  };

  refresh() {
    let $basketItemsDiv = $('#purchase__list');
    $basketItemsDiv.empty();


    for (let i = 0; i < this.basketItems.length; i++) {
      $basketItemsDiv.append(
        '<div class="purchase__item" id="purchase__item-' + i + '"><div class="purchase__img"><img src="'
        + this.basketItems[i]["src"]
        + '"></div><div class="purchase__info"><p class="purchase__title">'
        + this.basketItems[i]["title"] + '</p>'
        + '<div id="purchase__reiting' + i + '" class="purchase__reiting"></div>'
        + '<span class="purchase__price">'
        + this.basketItems[i]['quantity']
        + ' x $' + this.basketItems[i]['price']
        + '</span></div><div class="purchase__delite" id="basketItemDel-' + i + '">'
        + '<i class="fa fa-times-circle " aria-hidden="true"></i>' +
        '</div></div>');

      for (let j = 0; j < this.basketItems[i]['stars']; j++) {
        let star = $('<i />', {
          class: "fa fa-star",
          ariaHidden: 'true'
        });
        $("#purchase__reiting" + i).append(star);
      }

    }

    let $basketDataDiv = $('#basket_data');
    $basketDataDiv.empty();
    $basketDataDiv.append('<p class="total-price__text">Всего товаров: ' + this.countGoods + '</p>');
    $basketDataDiv.append('<p class="total-price__price">Сумма: ' + Math.round(this.amount*100)/100 + '</p>');


    let deleteItem = this.delete.bind(this);
    $('.purchase__item').on('click', '.purchase__delite', function () {
      let item = $(this).attr('id').split('-')[1];
      deleteItem(item);
      });
      $('.card__img--text').text(this.countGoods);



  };

  delete(item) {
    let itemToDelete = this.basketItems[item];
    this.countGoods -= itemToDelete['quantity'];
    this.amount -= itemToDelete['price'] * itemToDelete['quantity'];

    this.basketItems.splice(item, 1);
    this.refresh();

  };

  add(product, quantity, price, src, title, stars) {
    // console.log(product, quantity, price);
    let basketItems = {
      "id_product": product,
      "price": price,
      "src": src,
      "title": title,
      "quantity": quantity,
      "stars": stars

    };

////////////////////////////////////////
    //попытался сделать проверку на наличие в корзине товара с таким же id, но кажется запутался..
    // по идее нужно проверить все this.basketItems[j].id_product на наличие данного id.. и кажется это надо делать не через for а через for in..
    /*
    for( let j = 0; j < this.basketItems.length; j++){
      if(basketItems.id_product == this.basketItems[j].id_product ){

        this.basketItems[j].quantity +=quantity;
        this.countGoods++;
        this.amount += +price;

      } else{
        for (let i = 1; i <= quantity; i++) {
          this.basketItems.push(basketItems);
          this.countGoods++;
          this.amount += +price*quantity;
        }
      }

*/
    for (let i = 1; i <= quantity; i++) {
      this.basketItems.push(basketItems);
      this.countGoods++;
      this.amount += +price * quantity;
    }
    this.refresh();
  };

}


class HeaderMenu extends Container{
    Constructor(my_id, my_class) {
      this.id = my_id;
      this.className = my_class;
      this.items = [];
     // this.ajax();
    }

}







$(document).ready(function () {
  let searchList = new SearchSelectList();
  searchList.ajax();
  $('.search-select').append(searchList.render());





  let basket = new Basket();
  $('.card__menu').append(basket.collectBasketItems());

  $('.product__btn').on('click', function () {
    let idProduct = parseInt($(this).attr('id').split('-')[1]);
    let price = parseFloat($(this).parents('.product__item').find('.product__price').text()
      .replace(/[^\d.]/g,""));
    let src = $(this).parents('.product__item').find('.product__img').attr('src');
    let title = $(this).parents('.product__item').find('.product__text').text();
    let stars =  parseInt($(this).attr('data-stars')) || 5;
    let quantity = 1;


   basket.add(idProduct, quantity, price, src, title, stars)
    // console.log(idProduct, quantity, price, src, title, stars);

  });


  $('#search-select__list li').on('click', function () {
    $('#search__select option').attr('value', this.innerHTML).text(this.innerHTML);
  });


});