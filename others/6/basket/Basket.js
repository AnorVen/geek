function Basket(idBasket) {
    this.id = idBasket;
    this.basketItems = []; //Массив для хранения товаров
    this.countGoods = 0; //Общее кол-во товаров в корзине
    this.amount = 0; //Общая стоимость товаров, которые находятся в корзине

    //Получаем уже ранее добавленные товары в корзину
    this.collectBasketItems();
}

/**
 * Метод получения товаров из json файла
 */
Basket.prototype.collectBasketItems = function () {
    var appentId = '#' + this.id + '_items';
    //var self = this;
    $.get({
        url: './basket.json',
        dataType: 'json',
        context: this,
        success: function (data) {
            var $basketData = $('<div />', {
                id: 'basket_data'
            });

            this.countGoods = data.basket.length;
            this.amount = data.amount;

            $basketData.append('<p>Всего товаров: ' + this.countGoods + '</p>');
            $basketData.append('<p>Общая сумма: ' + this.amount + '</p>');

            $basketData.appendTo(appentId);

            //Добавляем сами товары в массив
            for(var itemKey in data.basket)
            {
                this.basketItems.push(data.basket[itemKey]);
            }

        }
    });
};

/**
 * Отрисовываем саму корзину на странице
 */
Basket.prototype.render = function (root) {
    var $basketDiv = $('<div />', {
        id: this.id,
        text: 'Корзина'
    });

    var $basketItemsDiv = $('<div />', {
        id: this.id + '_items'
    });

    $basketItemsDiv.appendTo($basketDiv);
    $basketDiv.appendTo(root);
};

/**
 * Метод добавляет новый товар в корзину
 * @param idProduct
 * @param quantity
 * @param price
 */
Basket.prototype.add = function (idProduct, quantity, price) {
    var basketItems = {
        "id_product": idProduct,
        "price": price
    };

    this.countGoods += quantity;
    this.amount += price * quantity;
    this.basketItems.push(basketItems);
    this.refresh(); //Перерисовываем корзину
};
/**
 * Метод удаляет товар из корзины
 */
Basket.prototype.remove = function (idProduct) {
    //Поиск среди добавленных товаров
    for (let i = 0; i < this.basketItems.length; i++) {
        if (this.basketItems[i].id_product === idProduct) {
            this.countGoods -= 1;
            this.amount -= this.basketItems[i].price;
            this.basketItems.splice(this.basketItems.indexOf(this.basketItems[i]), 1);
            break;
        }   
    }
    this.refresh();
};

/**
 * Метод перерисовывает корзину
 */
Basket.prototype.refresh = function () {
    var $basketDataDiv = $('#basket_data');
    $basketDataDiv.empty();
    $basketDataDiv.append('<p>Всего товаров: ' + this.countGoods + '</p>');
    $basketDataDiv.append('<p>Общая сумма: ' + this.amount + '</p>');
};