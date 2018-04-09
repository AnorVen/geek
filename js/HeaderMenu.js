/*
header-menu рендерится на php -т.к. в процессе работы оно не перестраивается.

*/

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
    // console.log(123)
    let result = '<ul class="' + this.className + '" id="' + this.id + '">';
    let a = [];
    for (let i = 0; i < this.items.length; i++) {
      let itemMenu = '<li class="' + this.items[i].class + '"><a href="' + this.items[i].link + '">' +
        this.items[i].title + '</a>';

      if (this.items[i].submenu) {
        let submenu = '<div class="sub-nav">';
        console.log(this.items[i].submenu);
        let submenuCol = '<div >';
        for (let j = 0; j < this.items[i].submenu.length; j++) {
            submenuCol += '<div class="' + this.items[i].submenu[j].title + '">' +
            '<a href="' + this.items[i].submenu[j].link + '">'
            + this.items[i].submenu[j].title + '</a></div>';
        }


        submenu += submenuCol;
        submenu += '</div>';
        itemMenu += submenu;
      }


      itemMenu += '</li>';

      result += itemMenu;

      //   console.log(result);

    }
    result += '</ul>';
    let nav = $('.header__nav');
    nav.empty();
    nav.append(result);
  }

  /*
    ___________________________
    //пример многоуровнего меню
    Menu.prototype.render = function () {
      var result = '<ul class="' + this.className + '" id="' + this.id + '">';
      for (var item in this.items) {
        if (this.items[item] instanceof MenuItem || this.items[item] instanceof SubMenu) {
          result += this.items[item].render();
        }
      }
      result += '</ul>';
      return result;
    }
  */

}

