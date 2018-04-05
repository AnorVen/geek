/*

 <div class="container">
    <div id="comments" class="comments"></div>
    <div class="comment-input">
      <textarea name="comment-input" id="comment-input"></textarea>
      <button id="add-comment">Добавить комментарий</button>
    </div>
  </div>
 */



class Comment {
  constructor(id, text, date, liked = false, stars, name) {
    this.id = id;
    this.text = text;
    this.date = date;
    this.liked = liked;
    this.stars = stars || 5;
    this.name = name || 'Ананаимус'
  }
  getHTML() {
    let commentContainer = document.createElement('div');
    commentContainer.classList.add('comment');
    if (this.liked) {
      commentContainer.classList.add('liked');      
    }
    commentContainer.setAttribute('id', this.id);

    let textContainer = document.createElement('div');
    textContainer.classList.add('comment-text');
    let date = document.createElement('p');
    date.classList.add('date');
    date.textContent = this.date;
    let text = document.createElement('p');
    text.classList.add('text');
    text.textContent = this.text;
    textContainer.appendChild(date);
    textContainer.appendChild(text);

    let btnContainer = document.createElement('div');
    btnContainer.classList.add('btns');
    let remove = document.createElement('button');
    let like = document.createElement('button');
    remove.classList.add('remove');
    remove.textContent = 'Удалить';
    like.classList.add('like');
    like.textContent = 'Одобрить';    
    btnContainer.appendChild(like);
    btnContainer.appendChild(remove);

    let stars = document.createElement('div');
    stars.classList.add('product_stars');
    let star_text;
    star_text = document.createElement('p');
    star_text.classList.add('text');
    star_text.textContent = this.stars;
    stars.appendChild(star_text);


    let name = document.createElement('p');
    name.classList.add('name');
    name.textContent = this.name;

    textContainer.appendChild(name);



    commentContainer.appendChild(textContainer);

    commentContainer.appendChild(stars);
    commentContainer.appendChild(btnContainer);
    return commentContainer;
  }
}

class Comments {
  constructor(idComments, idBtnAdd, idTextComment, idStar, idName) {
    this.id = idComments;
    this.newTextComment = idTextComment;
    this.idStar = idStar;
    this.idName = idName;

    this.commentsItem = [];
    this._collectComments();
    document.querySelector(idBtnAdd).addEventListener('click', () => this.add());
    document.querySelector(this.id).addEventListener('click', e => this.remove(e));
    document.querySelector(this.id).addEventListener('click', e => this.like(e));
  }
 // document.querySelector('#single-stars').value
  _collectComments() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', './js/json/comments.json', true);
    xhr.onreadystatechange = () => {
      if(xhr.readyState !== 4) {
        return;
      }
      if(xhr.status !== 200) {
        return;
      } else {
        let comments = JSON.parse(xhr.responseText);
        comments.forEach(elem => {
          this.commentsItem.push(new Comment(elem.id, elem.text, elem.date,
                                      elem.liked, elem.stars, elem.name ));
        });
        this.render();
      }
    }
    xhr.send();
  }
  render() {
    document.querySelector(this.id).innerHTML = '';
    this.commentsItem.forEach(elem => {
      document.querySelector(this.id).appendChild(elem.getHTML());
    })
  }
  add() {
    let id = this._getIdOfComment();
    this.commentsItem.push(new Comment(id, document.querySelector(this.newTextComment).value,
      this._getDateComment(), '', document.querySelector(this.idStar).value,
      document.querySelector(this.idName).value));
    this.render();
  }
  remove(e) {
    if (e.target.className !== 'remove') return;
    for (let item of this.commentsItem) {
      if (+e.target.parentNode.parentNode.attributes.id.value === item.id) {
        this.commentsItem.splice(this.commentsItem.indexOf(item), 1);
        break;
      }
    }
    this.render();
  }
  like(e) {
    if (e.target.className !== 'like') return;
    for (let item of this.commentsItem) {
      if (+e.target.parentNode.parentNode.attributes.id.value === item.id) {
        item.liked = true;
        this.render();
        break;
      }
    }
  }
  _getIdOfComment() {
    let id = 1;
    while (this.commentsItem.some(item => item.id === id)) {
      id++;
    }
    return id;
  }
  _getDateComment() {
    let date = new Date();
    let yyyy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();
    let hh = date.getHours();
    let min = date.getMinutes();
    if (mm < 10) {
      mm = '0' + mm;
    }
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (hh < 10) {
      hh = '0' + hh;
    }
    if (min < 10) {
      min = '0' + min;
    }
    return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
  }
}