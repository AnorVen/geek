'use strict';
$("#slider").rangeSlider({
  bounds: {min: 52, max: 400},
  defaultValues: {min: 80, max: 200}
});

class Conreiner {
  Constructor() {
    this.id = '';
    this.className = '';
    this.htmlCode = '';

  }


  render() {
    return this.htmlCode;
  }
}

class SearchSelectList extends Conreiner{
  Constructor(my_id, my_class) {
    this.id = my_id;
    this.className = my_class;
    this.items = [];
    this.ajax();
  }

  render() {
    let result = '<ul class="' + this.className + '" id="' + this.id + '">';
    let items = this.items;
    items.forEach(function(item){
      result += '<li class="' + item.class + '" data-value=' + item.data + ' >' + item.name + '</li>';
    })
   /* for( let i = 0, i < this.items.length; i++){
      result += i
    }*/

    result += '</ul>';
    return result;
  }
  ajax(){
    $.ajax({
      url: './js/json/search.json',
      dataType: 'json',
      async: false,
      success: function (data) {
        console.log(data.menuItems);
        this.id = data.list.id;
        this.className = data.list.class;
        let a = [];
        for( let i = 0; i < data.menuItems.length; i++){

          console.log(data.menuItems[i]);
          a.push(data.menuItems[i]);

        }
        this.items = a;
        console.log(this.items);
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









$(document).ready(function () {
  console.log('ready');
  let searchList = new SearchSelectList();
  searchList.ajax();
  $('.search-select').append(searchList.render());






  $('#search-select__list li').on('click', function(){
    $('#search__select option').attr('value', this.innerHTML).text(this.innerHTML);
  });
})