"use strict";

/**
 * Проверка есть ли корзина в localStorage
 * Если нет, то создает
 */
if (!localStorage.getItem("cart")) {
    let productsInCart = [];
    localStorage.setItem("cart", JSON.stringify(productsInCart));
}

/**
 * Записывает из localStorage данные в массив
 */
let productsInCart = JSON.parse(localStorage.getItem("cart"));


/**
 * Объект корзины
 */
const cart = {
    /**
     * Первоначальные данные общего количества и конечной цены
     */
    totalCartSettings: {
        totalQty: 0,
        totalPrice: 0
    },

    /**
     * Считает общее количество и окончательную цену исходя из товаров в корзине
     */
    createTotalCartSettings() {
        for (let i = 0; i < productsInCart.length; i++) {
            this.totalCartSettings.totalQty += productsInCart[i].qty;
            this.totalCartSettings.totalPrice += productsInCart[i].price * productsInCart[i].qty;
        }
    },

    /**
     * Инициализинует корзину
     */
    init() {
        const buttonArray = document.querySelectorAll('.add_to_cart');
        this.createTotalCartSettings();
        this.outputQtyTotalPrice();
        this.createListContainer();
        this.addProductToCart(buttonArray);
    },

    /**
     * Выводит общее количество и окончательную цену
     */
    outputQtyTotalPrice() {
        document.querySelector('.totalQty').innerHTML = this.totalCartSettings.totalQty;
        document.querySelector('.totalPrice_price').innerHTML = this.totalCartSettings.totalPrice;
    },

    addProductToCart(buttonArray) {
        for (let i = 0; i < buttonArray.length; i++) {
            buttonArray[i].addEventListener('click', (event) => this.addToCart(event))
        }
    },

    /**
     * Добавляет товар в корзину
     * @param {MouseEvent} event Событие клика мышью
     */
    addToCart(event) {
        this.checkForAvailability(event);
        this.createListContainer();
        this.changeTotalCounter(event);
    },

    /**
     * Проверяет есть ли такой товар в корзине
     * @param {MouseEvent} event Событие клика мышью
     */
    checkForAvailability(event) {
        for (let i = 0; i < productsInCart.length; i++) {
            if (productsInCart[i].id === +event.target.dataset.id) {
                productsInCart[i].qty += 1;
                localStorage.setItem("cart", JSON.stringify(productsInCart));
                return;
            }
        }
        this.addNewProduct(event);
    },

    /**
     * Добавляет товар в корзину если его там нет
     * @param {MouseEvent} event Событие клика мышью
     */
    addNewProduct(event) {
        productsInCart.push({
            'id': +event.target.dataset.id,
            'name': event.target.dataset.name,
            'price': +event.target.dataset.price,
            'img': event.target.dataset.img,
            'qty': 1,
        });
        localStorage.setItem("cart", JSON.stringify(productsInCart));
    },

    /**
     * Пересчитывет количество товара в корзине и общую стоимость
     * @param event
     */
    changeTotalCounter(event) {
        this.totalCartSettings.totalQty += 1;
        this.totalCartSettings.totalPrice += +event.target.dataset.price;
        this.outputQtyTotalPrice();
    },

    /**
     * Выводит товары в корзину
     */
    createListContainer() {
        const productsInCartContainer = document.querySelector('.productsInCart');
        productsInCartContainer.innerHTML = '';

        for (let i = 0; i < productsInCart.length; i++) {
            const productWrap = document.createElement('article');
            productWrap.classList.add('productCartCard');
            productsInCartContainer.appendChild(productWrap);

            const imgLink = document.createElement('a');
            imgLink.setAttribute('href', 'single.html?id=' + productsInCart[i].id);
            imgLink.classList.add('productCartCard_image');
            productWrap.appendChild(imgLink);

            const image = new Image();
            image.src = `img/${productsInCart[i].img}`;
            image.alt = productsInCart[i].name;
            imgLink.appendChild(image);

            const productInfo = document.createElement('div');
            productInfo.classList.add('productCartInfo');
            productWrap.appendChild(productInfo);

            const productName = document.createElement('div');
            productName.classList.add('product_name');
            productInfo.appendChild(productName);

            const productLink = document.createElement('a');
            productLink.setAttribute('href', 'single.html?id=' + productsInCart[i].id);
            productLink.classList.add('product_name_link');
            productLink.innerHTML = productsInCart[i].name;
            productName.appendChild(productLink);

            const productPrice = document.createElement('div');
            productPrice.classList.add('productCartPrice');
            productPrice.innerHTML = `<span class="productCartQty">${productsInCart[i].qty} </span>x 
                                      <span class="productCartPrice"> ${productsInCart[i].price} руб.</span>`;
            productInfo.appendChild(productPrice);

            const productButtonWrap = document.createElement('div');
            productButtonWrap.classList.add('productCartButton');
            productWrap.appendChild(productButtonWrap);

            const productButton = document.createElement('button');
            productButton.classList.add('productCartButton');
            productButton.innerHTML = `Del`;
            productButton.setAttribute('data-id', productsInCart[i].id);
            productButton.addEventListener('click', (event) => {
                event.stopPropagation();
                this.deleteFromCart(event)
            });
            productButtonWrap.appendChild(productButton);
        }
    },

    /**
     * Удаляет товар из корзины
     * @param {MouseEvent} event Событие клика мышью
     */
    deleteFromCart(event) {
        for (let i = 0; i < productsInCart.length; i++) {
            if (productsInCart[i].id === +event.target.dataset.id) {
                this.totalCartSettings.totalQty -= productsInCart[i].qty;
                this.totalCartSettings.totalPrice -= productsInCart[i].price * productsInCart[i].qty;
                productsInCart.splice(i, 1);
            }
        }
        this.createListContainer();
        this.outputQtyTotalPrice();
        localStorage.setItem("cart", JSON.stringify(productsInCart));
    },
};

/**
 * Объект карзины, для вывода на страницу
 */
const pageCart = {
    init() {
        this.createCart()
    },

    createCart() {
        const cartContainer = $('.cart__table');
        cartContainer.html('');
        for (let i = 0; i < productsInCart.length; i++) {
            let tableTr = $('<tr/>');
            tableTr.appendTo(cartContainer);

            let tableTh = $('<th/>', {class: 'text-center'}).html(i + 1);
            tableTh.appendTo(tableTr);

            let tableTdPhoto = $('<td/>', {class: 'text-center'});
            let photo = $('<img>', {src: 'img/' + productsInCart[i].img, 'alt': productsInCart[i].title, style: 'width: 50px'});
            photo.appendTo(tableTdPhoto);
            tableTdPhoto.appendTo(tableTr);

            let tableTdName = $('<td/>', {class: 'text-center'});
            let link = $('<a/>', {href: 'products.html?id=' + productsInCart[i].id}).html(productsInCart[i].name);
            link.appendTo(tableTdName);
            tableTdName.appendTo(tableTr);

            let tableTdQty = $('<td/>', {class: 'text-center'}).html(productsInCart[i].qty);
            tableTdQty.appendTo(tableTr);

            let tableTdPrice = $('<td/>', {class: 'text-center'}).html(productsInCart[i].price + ' руб.');
            tableTdPrice.appendTo(tableTr);

            let tableTdSum = $('<td/>', {class: 'text-center'}).html(productsInCart[i].qty * productsInCart[i].price + ' руб.');
            tableTdSum.appendTo(tableTr);

            let tableTdBtn = $('<button/>', {class: 'productCartButton', 'data-id': productsInCart[i].id});
            tableTdBtn.click((event) => {
                this.refreshCart(event)
            });
            tableTdBtn.html('Del').appendTo(tableTr);
        }
    },

    refreshCart(event) {
        cart.deleteFromCart(event);
        this.createCart();
    }
};