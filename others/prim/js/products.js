"use strict";

class Products {
    constructor(productId, productName, productImg, productPrice, productRating) {
        this.productId = productId;
        this.productName = productName;
        this.productImg = productImg;
        this.productPrice = productPrice;
        this.productRating = productRating;
    }
}

class ProductCart extends Products {
    constructor(productId, productName, productImg, productPrice, productRating, productCartClass, productImgClass,
                productNameClass, productRatingClass, productPriceClass, productBtnClass, productLink) {
        super(productId, productName, productImg, productPrice, productRating);
        this.productCartClass = productCartClass;
        this.productImgClass = productImgClass;
        this.productNameClass = productNameClass;
        this.productRatingClass = productRatingClass;
        this.productPriceClass = productPriceClass;
        this.productBtnClass = productBtnClass;
        this.productLink = productLink;
    }

    render() {
        let result = '<article class="' + this.productCartClass + '">';
        result += '<a href="' + this.productLink + '" class="' + this.productImgClass + '" data-id="' + this.productId + '">';
        result += '<img src="img/' + this.productImg + '" alt="' + this.productName + '">';
        result += '</a>';
        result += '<div class="' + this.productNameClass + '">';
        result +=  '<a href="' + this.productLink + '" data-id="' + this.productId + '">';
        result += this.productName;
        result += '</a>';
        result += '</div>';
        result += '<div class="' + this.productRatingClass + '">';
        for (let i = 0; i < Math.round(this.productRating); i++) {
            result += '<i class="fas fa-star"></i>';
        }
        for (let i = 0; i < (5 - Math.round(this.productRating)); i++) {
            result += '<i class="far fa-star"></i>';
        }
        result += '</div>';
        result += '<div class="' + this.productPriceClass + '">';
        result += '<button class="' + this.productBtnClass + '" data-id="' + this.productId
            + '" data-name="' + this.productName + '" data-img="' + this.productImg
            + '" data-price="' + this.productPrice + '">';
        result += this.productPrice + ' руб.';
        result += '</button>';
        result += '</div>';

        return result;
    }
}

class SingleProduct extends Products {
    constructor(productId, productName, productImg, productPrice, productRating, productImgClass,
                productNameClass, productRatingClass, productPriceClass, productBtnClass, productDescription1,
                productDescription2, productDescription3) {
        super(productId, productName, productImg, productPrice, productRating);
        this.productImgClass = productImgClass;
        this.productNameClass = productNameClass;
        this.productRatingClass = productRatingClass;
        this.productPriceClass = productPriceClass;
        this.productBtnClass = productBtnClass;
        this.productDescription1 = productDescription1;
        this.productDescription2 = productDescription2;
        this.productDescription3 = productDescription3;
    }

    render() {
        let result = '<div class="col-md-4 col-sm-12 product__info__left">';
        result += '<div class="' + this.productImgClass + '">';
        result += '<img src="img/' + this.productImg + '" alt="' + this.productName + '">';
        result += '</div>';
        result += '<button class="' + this.productBtnClass + '" data-id="' + this.productId
            + '" data-name="' + this.productName + '" data-img="' + this.productImg
            + '" data-price="' + this.productPrice + '">';
        result += 'Купить';
        result += '</button>';
        result += '</div>';
        result += '<div class="col-md-7 col-md-offset-1 col-sm-12 product__info__right">';
        result += '<h3 class="' + this.productNameClass + '">';
        result += this.productName;
        result += '</h3>';
        result += '<p class="' + this.productPriceClass + '">';
        result += 'Цена: ' + this.productPrice + ' руб.';
        result += '</p>';
        result += '<div class="' + this.productRatingClass + '">';
        for (let i = 0; i < Math.round(this.productRating); i++) {
            result += '<i class="fas fa-star"></i>';
        }
        for (let i = 0; i < (5 - Math.round(this.productRating)); i++) {
            result += '<i class="far fa-star"></i>';
        }
        result += '</div>';
        result += this.renderTab();
        result += '</div>';

        return result;
    }

    renderTab() {
        let result = '<div class="tab">';
        result += '<ul class="tab__item">';
        result += '<li class="active">1</li>';
        result += '<li>2</li>';
        result += '<li>3</li>';
        result += '</ul>';
        result += '<div class="desc1 tab__description active">' + this.productDescription1 + '</div>';
        result += '<div class="desc2 tab__description">' + this.productDescription2 + '</div>';
        result += '<div class="desc3 tab__description">' + this.productDescription3 + '</div>';
        result += '</div>';

        return result;
    }
}

class RecommendationProduct extends Products {
    constructor(productId, productName, productImg) {
        super(productId, productName, productImg);
    }

    render() {
        let result = '<a href="products.html?id=' + this.productId + '">';
        result += '<img src="img/' + this.productImg + '" alt="' + this.productName + '">';
        result += '</a>';
        return result;
    }
}