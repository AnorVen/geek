class Products extends Container {
  Constructor(my_id, my_class) {
    this.id = my_id;
    this.className = my_class;
    this.items = [];
    this.ajax();
  }

  render() {
    let that = this;
    let result = $('.product');
    // result.empty();
    if (!result.hasClass('product__list')) {
      result.addClass('product__list')
    }


    for (let j = 0; j < this.items.length; j++) {
      let product__item = $('<div />', {
        class: 'product__item ui-widget-content'
      });

      product__item.append('<img src="' + that.items[j].src + '" alt="' + that.items[j].title + '" class="product__img" width="261" height="280"> <a href="#" class="product__link"><p class="product__text">' + that.items[j].title + '</p></a>' +
        '<p class="product__price">$' + that.items[j].price + '</p> ' +
        ' <div class="product__shadow"><button class="product__btn" id="id_product-' + that.items[j].id_item + '">' +
        '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24">' +
        '<defs><style> .cls-1 {fill: #fff; stroke: #fff; stroke-linejoin: round; stroke-width: 0px;' +
        'fill-rule: evenodd;}</style>\</defs><path id="Forma_1_copy" data-name="Forma 1 copy" class="cls-1"' + ' d="M898.851,2004.79h2.438l3.474,13.25a0.862,0.862,0,0,0,.823.65h10.676a0.852,0.852,0,0,0,.78-0.54l3.885-9.41a0.941,0.941,0,0,0-.071-0.85,0.827,0.827,0,0,0-.709-0.41h-11.8a0.9,0.9,0,0,0,0,1.8h10.492l-3.148,7.62h-9.471l-3.474-13.24a0.86,0.86,0,0,0-.822-0.66h-3.077A0.9,0.9,0,0,0,898.851,2004.79Zm5.926,20.21a2.038,2.038,0,1,0-1.928-2.03A1.983,1.983,0,0,0,904.777,2025Zm12.053,0h0.141a1.865,1.865,0,0,0,1.319-.7,2.117,2.117,0,0,0,.468-1.48,1.976,1.976,0,0,0-2.056-1.89,2.015,2.015,0,0,0-1.787,2.17A1.982,1.982,0,0,0,916.83,2025Z" transform="translate(-897 -2002)"/></svg>' +
        'Add to Cart</button></div>');

      result.append(product__item);
      product__item.draggable();

    }
    return result;


  }

  ajax() {
    $.ajax({
      url: './js/json/items.json',
      dataType: 'json',
      async: false,
      success: function (data) {
        this.id = data.list.id;
        this.className = data.list.class;
        let a = [];
        for (let i = 0; i < data.items.length; i++) {
          a.push(data.items[i]);

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