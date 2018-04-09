class SearchSelectList extends Container {
  Constructor(myId, myClass) {
    this.id = myId;
    this.className = myClass;
    this.items = [];
    this.ajax();
  }

  render() {
    let result = '<ul class="' + this.className + '" id="' + this.id + '">';
    let items = this.items;
    items.forEach(function (item) {
      result += '<li class="' + item.class + '" data-value=' + item.data + ' >' + item.name + '</li>';
    });
    result += '</ul>';
    return result;
  }

  ajax() {
    $.ajax({
      url: './js/json/search.json',
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