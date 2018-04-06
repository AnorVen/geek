"use strict";

class Menu {
    constructor(menuClass, menuItems) {
        this.menuClass = menuClass;
        this.menuItems = menuItems;
    }

    render() {
        let result = '<ul class="' + this.menuClass + '">';
        for (let i = 0; i < this.menuItems.length; i++) {
            if (this.menuItems[i] instanceof MenuItem || this.menuItems[i] instanceof SubMenu) {
                result += this.menuItems[i].render();
            }
        }
        result += '</ul>';
        return result;
    }
}

class SubMenu extends Menu {
    constructor(menuClass, menuItems, itemClass, itemTitle, linkClass, linkHref) {
        super(menuClass, menuItems);
        this.itemClass = itemClass;
        this.itemTitle = itemTitle;
        this.linkClass = linkClass;
        this.linkHref = linkHref;
    }

    render() {
        let result = '<li class="' + this.itemClass + '">';
        result += '<a href = "' + this.linkHref + '" class = "' + this.linkClass
            + '" data-toggle = "dropdown" role = "button" aria-haspopup = "true" aria-expanded = "false">';
        result += this.itemTitle;
        result += '</a>';
        result += super.render();
        result += '</li>';
        return result;
    }
}

class MenuItem {
    constructor(itemClass, itemTitle, linkClass, linkHref) {
        this.itemClass = itemClass;
        this.itemTitle = itemTitle;
        this.linkClass = linkClass;
        this.linkHref = linkHref;
    }

    render() {
        let result = '<li class="' + this.itemClass + '">';
        result += '<a href="' + this.linkHref + '" class="' + this.linkClass + '">';
        result += this.itemTitle;
        result += '</a></li>';
        return result;
    }
}

const leftMenu = {
    init() {
        let leftMenuContainer = $('.menu__left');
        this.createMenu(leftMenuContainer);
    },

    createMenu(container) {
        let items = [];
        $.ajax({
            url: './responses/categoriesData.json',
            type: 'GET',
            dataType: 'json',
            success: function (result) {
                for (let i = 0; i < result.length; i++) {
                    if (result[i].children) {
                        let subItems = [];
                        for (let j = 0; j < result[i].children.length; j++) {
                            let subItem = new MenuItem('menu__left_item', result[i].children[j].title,
                                'menu__left_link', 'categories.html?id=' + result[i].children[j].id);
                            subItems.push(subItem);
                        }
                        let item = new SubMenu('dropdown-menu', subItems, 'menu__left_item', result[i].title,
                            'menu__left_link', '#');
                        items.push(item);
                    }
                    if (!result[i].children) {
                        let item = new MenuItem('menu__left_item', result[i].title, 'menu__left_link', 'categories.html?id=' + result[i].id);
                        items.push(item);
                    }
                }
                let menu = new Menu('nav', items);
                container.html(menu.render());
            }
        })
    }
};

const topMenu = {
    init() {
        let topMenuContainer = $('.menu__top');
        this.createMenu(topMenuContainer);
    },

    createMenu(container) {
        let items = [];
        $.ajax({
            url: './responses/pagesData.json',
            type: 'GET',
            dataType: 'json',
            success: function (result) {
                for (let i = 0; i < result.length; i++) {
                    let item = new MenuItem('menu__top_item', result[i].title, 'menu__top_link', result[i].href);
                    items.push(item);
                }
                let menu = new Menu('nav navbar-nav navbar-right', items);
                container.html(menu.render());
            }
        })
    }
};