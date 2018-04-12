/* eslint-disable no-plusplus */
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

        this.render(root);
        this.refresh();
      },
      context: this
    });
  }

  collectCartItems(root) {
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

        this.renderShoppingCart(root);
        this.refreshShoppingCart();
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


  };

  renderShoppingCart() {
    let cartDiv = $('#cart__items');

    let basketItemDiv = $('<div />', {
      class: 'cart__item cart__prod'
    });
    let productDetails = $('<div />', {
      class: 'prod__productDetails'
    });

    let prodInfo = $('<div />', {
      class: 'prod__info'
    });


    cartDiv.empty();

    cartDiv.append(basketItemDiv);
    basketItemDiv.append(productDetails);
    basketItemDiv.append(prodInfo);

  }

  refreshShoppingCart() {
    let cartDiv = $('#cart__items');
    cartDiv.empty();


    for (let i = 0; i < this.basketItems.length; i++) {

      cartDiv.append(
        '<div class="cart__item cart__prod" id="purchase__item-' + i + '">' +

        '<div class="prod__productDetails">' +
        '<img src="' + this.basketItems[i]["src"] + '" style=" width:100px; height:115px">' +


        '<div class="prod__options">' +
        '<h3 class="prod__title">' + this.basketItems[i]["title"] + '</h3>' +
        '<p class="prod__color">Цвет: <span class="prod__color--red">черный</span></p>' +
        '<p class="prod__size">Размер: <span class="prod__size--xii">XL</span></p>' +
        '</div> </div>' +


        '<div class="prod__info"><div class="info__price"><p> $' + this.basketItems[i]['price'] + '</p></div>'

        + '<div class="info__quantity">' +
        '<input type="text" value="' + this.basketItems[i]['quantity'] + '"></div>' +

        '<div class="info__shipping"><p>Бесплатно</p></div>'

        + '<div class="info__subtotal"><p>' +
        this.basketItems[i]['price'] * this.basketItems[i]['quantity'] +
        '</p></div>'

        + '<div class="info__action"  ><a href="#">' +
        '<i class="fa fa-times-circle" aria-hidden="true" id="info__action-' + i + '"></i></a></div></div></div>');

    }


    let deleteItem = this.deleteCadt.bind(this);
    $('.info__action').on('click', 'a i', function () {
      let item = $(this).attr('id').split('-')[1];
      deleteItem(item);
    });
    let totalPrice = 0
    let a = document.querySelectorAll('.info__price p');
    let b = document.querySelectorAll('.info__quantity input').value;

    for (let i = 0; i < a.length; i++) {

      totalPrice += a[i]*b[i];
    }
    $('.total__sub--price').text(totalPrice);
    $('.total__grand--prise').text((parseInt(totalPrice) * 99)/100);


  };
  deleteCadt(item) {
    let itemToDelete = this.basketItems[item];
    this.countGoods -= itemToDelete['quantity'];
    this.amount -= itemToDelete['price'] * itemToDelete['quantity'];

    this.basketItems.splice(item, 1);
    this.refresh();
    this.refreshShoppingCart();

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


      let stars = 0;

      for (let j = 0; j < this.basketItems[i]['stars']; j++) {
        let star = $('<i />', {
          class: "fa fa-star",
          ariaHidden: 'true'
        });
        $("#purchase__reiting" + i).append(star);
        stars++
      }
      if (stars <= 5) {
        for (let k = 5 - stars; k > 0; k--) {
          let star1 = $('<i />', {
            class: "fa fa-star-o",
            ariaHidden: 'true'
          });
          $("#purchase__reiting" + i).append(star1);
        }

      }

    }

    let $basketDataDiv = $('#basket_data');
    let basketLink = $('#card__link');
    $basketDataDiv.empty();
    basketLink.empty();
    if (this.countGoods !== 0) {

      basketLink.append('<div class="card__checkout"><a href="#">Перейти к оплате</a></div><div class="card__go-to-card"><a href="#">Перейти в карзину</a></div>');
    }

    $basketDataDiv.append('<p class="total-price__text">Всего товаров: ' + this.countGoods + '</p>');
    $basketDataDiv.append('<p class="total-price__price">Сумма: ' + Math.round(this.amount * 100) / 100 + '</p>');


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
    let flag = true;
    for (let i = 1; i <= quantity; i++) {

      for (let j = 0; j < this.basketItems.length; j++) {
        if (basketItems.id_product === this.basketItems[j].id_product) {
          flag = false;
          this.basketItems[j].quantity++;

        }
      }
      if (flag) {
        this.basketItems.push(basketItems);
      }

      this.countGoods++;
      this.amount += +price * quantity;
    }
    this.refresh();
  };

}