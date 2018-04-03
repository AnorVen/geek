class Comment {
  constructor(id, text, date, liked = false) {
    this.id = id;
    this.text = text;
    this.date = date;
    this.liked = liked;
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

    commentContainer.appendChild(textContainer);
    commentContainer.appendChild(btnContainer);
    return commentContainer;
  }
}