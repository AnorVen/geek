function Good(id, title, price) {
    this.id = id;
    this.title = title;
    this.price = price;
}

Good.prototype.render = function (jQuerySelector) {
  var $goodContainer = $('<div />', {
      class: 'good'
  });

  var $goodTitle = $('<p />', {
      text: this.title
  });

  var $goodPrice = $('<p>Цена: <span class="product-price">' + this.price + '</span> руб.</p>');

  var $goodBtn = $('<button />', {
      class: 'buygood',
      'data-id': this.id,
      text: 'Купить'
  });
  var $goodBtn2 = $('<button />', {
      class: 'removegood',
      'data-id': this.id,
      text: 'Удалить'
  });

  //Создаем структуру в DOM
    $goodTitle.appendTo($goodContainer);
    $goodPrice.appendTo($goodContainer);
    $goodBtn.appendTo($goodContainer);
    $goodBtn2.appendTo($goodContainer);

    jQuerySelector.append($goodContainer);
};