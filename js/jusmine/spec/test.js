describe("Basket", function() {
var basket;
var product;

  beforeEach(function () {
    basket = new Basket();
    product = '<div class="purchase__item" id="purchase__item-3"><div class="purchase__img"><img src="./img/item__3.jpg"></div><div class="purchase__info"><p class="purchase__title">Mango People T-shirt</p><div id="purchase__reiting3" class="purchase__reiting"><i class="fa fa-star" ariahidden="true"></i><i class="fa fa-star" ariahidden="true"></i><i class="fa fa-star" ariahidden="true"></i><i class="fa fa-star" ariahidden="true"></i><i class="fa fa-star" ariahidden="true"></i></div><span class="purchase__price">1 x $52</span></div><div class="purchase__delite" id="basketItemDel-3"><i class="fa fa-times-circle " aria-hidden="true"></i></div></div>';
  });

  it("basket add", function () {

    expect(basket.add(3, 1, 52, "./img/item__3.jpg", "Mango People T-shirt", false).innerHTML).toEqual(product);


   })
});