/*
header-menu рендерится на php -т.к. в процессе работы оно не перестраивается.



class HeaderMenu extends Container {
  Constructor(my_id, my_class) {
    this.id = my_id;
    this.className = my_class;
    this.items = [];
    this.ajax();
  }

  ajax() {
    $.ajax({
      url: './js/json/headerMenu.json',
      dataType: 'json',
      async: false,
      success: function (data) {
        console.log(data);
        this.id = data.list.id;
        this.className = data.list.class;
        let a = [];
        for (let i = 0; i < data.menuItems.length; i++) {
          a.push(data.menuItems[i]);

        }
        this.items = a;
        this.renderHeaderMenu();
      },
      context: this
    });
  }

  renderHeaderMenu() {
    console.log(123)
    let result = '<ul class="' + this.className + '" id="' + this.id + '">';
    //   for (let item in this.items) {
    let a = [];
    for (let i = 0; i < this.items.length; i++) {
      let itemMenu = '<li class="' + this.items[i].class + '"><a href="' + this.items[i].link + '">' +
        this.items[i].title + '</a>';

      if (this.items[i].submenu) {
        let submenu = '<div class="sub-nav">';
        console.log(this.items[i].submenu);


        for (let j = 0; j < this.items[i].submenu.length; j++) {
          let submenuCol = '<div class="' + this.items[i].submenu[j].class + '"><span>' +
            this.items[i].submenu[j].title + '</span>';
          console.log(submenuCol);

          for (let k = 0; k < this.items[i].submenu[j].list.length; k++) {
            submenuCol += '<div class="' + this.items[i].submenu[j].list[k].class + '">' +
              '<a href="' + this.items[i].submenu[j].list[k].link + '">'
              + this.items[i].submenu[j].list[k].title + '</a></div>';
          }

          submenuCol += '</div>';
          submenu += submenuCol
        }
        submenu += '</div>';
        itemMenu += submenu;
      }


      itemMenu += '</li>';

      result += itemMenu;

      console.log(result);

    }
    result += '</ul>';
    let nav = $('.header__nav');
    nav.empty();
    nav.append(result);
  }
  ___________________________
  //пример многоуровнего меню
  Menu.prototype.render = function() {
  var result = '<ul class="'+this.className+'" id="'+this.id+'">';
  for (var item in this.items) {
    if (this.items[item] instanceof MenuItem || this.items[item] instanceof SubMenu) {
      result += this.items[item].render();
    }
  }
  result += '</ul>';
  return result;
}


}*/