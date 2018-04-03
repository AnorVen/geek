class Comments {
  constructor(idComments, idBtnAdd, idTextComment) {
    this.id = idComments;
    this.newTextComment = idTextComment;
    this.commentsItem = [];
    this._collectComments();
    document.querySelector(idBtnAdd).addEventListener('click', () => this.add());
    document.querySelector(this.id).addEventListener('click', e => this.remove(e));
    document.querySelector(this.id).addEventListener('click', e => this.like(e));
  }
  _collectComments() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', './comments.json', true);
    xhr.onreadystatechange = () => {
      if(xhr.readyState !== 4) {
        return;
      }
      if(xhr.status !== 200) {
        return;
      } else {
        let comments = JSON.parse(xhr.responseText);
        comments.forEach(elem => {
          this.commentsItem.push(new Comment(elem.id, elem.text, elem.date, elem.liked));
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
    this.commentsItem.push(new Comment(id, document.querySelector(this.newTextComment).value, this._getDateComment()));
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