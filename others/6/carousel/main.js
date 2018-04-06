'use strict';

class Carousel {
  constructor(containerId) {
    this.imgs = ['img/1.jpg', 'img/2.jpg', 'img/3.jpg', 'img/4.jpg'];
    this.containerId = document.querySelector(containerId);
    this.imgWidth = 1024;
    this.position = 0;
    this.dragElem;
  }

  run() {
    this._render();
    setInterval(() => this._showNextImg(), 10000);
    this.dragElem = document.querySelector('#carousel-ul');    
    document.querySelector('.prev').addEventListener('click', () => this._showPrevImg());
    document.querySelector('.next').addEventListener('click', () => this._showNextImg());
    document.querySelector('#carousel-ul').addEventListener('mousedown', e => this._dragImgs(e));
    this.dragElem.addEventListener('mouseup', e => {
      if (parseInt(this.dragElem.style.left) > 0) {
        this.dragElem.style.left = this.position + 'px';
      } else if (parseInt(this.dragElem.style.left) < -((this.imgs.length - 1) * this.imgWidth)) {
        this.dragElem.style.left = -((this.imgs.length - 1) * this.imgWidth) + 'px';
      } else if (this.position > parseInt(this.dragElem.style.left)) {
        this._showNextImg();
      } else {
        this._showPrevImg();
      }
      this.dragElem = null;
    })
  }

  _render() {
    this.containerId.innerHTML = '';
    this.containerId.appendChild(this._getCarousel());
  }

  _dragImgs(e) {    
    if(e.target.tagName === 'BUTTON' && e.target.className !== 'container') return;
    this.dragElem = document.querySelector('#carousel-ul');
    this.dragElem.ondragstart = () => false;
    const shiftX = e.layerX - (this.position + pageXOffset);    
    this.dragElem.addEventListener('mousemove', e => {
      if(this.dragElem == null) return;
      this.dragElem.style.left = e.layerX - shiftX + 'px';
    });
  }

  _showPrevImg() {
    this.position += this.imgWidth;    
    if (this.position > 0) {
      this.position = -((this.imgs.length - 1) * this.imgWidth);
    }
    document.querySelector('#carousel-ul').style.left = this.position + 'px';    
  }

  _showNextImg() {
    this.position -= this.imgWidth; 
    if (this.position === -(this.imgs.length * this.imgWidth)) {
      this.position = 0;
    }
    document.querySelector('#carousel-ul').style.left = this.position + 'px';    
  }

  _getCarousel() {
    const carousel = document.createElement('div');
    carousel.setAttribute('id', 'carousel');
    carousel.appendChild(this._getImgs());
    const btn1 = document.createElement('button');
    btn1.classList.add('prev');
    btn1.textContent = 'Prev';
    const btn2 = document.createElement('button');
    btn2.classList.add('next');
    btn2.textContent = 'Next';    
    carousel.appendChild(btn1);
    carousel.appendChild(btn2);
    return carousel;
  }
  _getImgs() {
    const ul = document.createElement('ul');
    ul.setAttribute('id', 'carousel-ul');
    ul.style.width = this.imgWidth * this.imgs.length + 'px';
    for (let i = 0; i < this.imgs.length; i++) {
      const img = document.createElement('img');
      const li = document.createElement('li');
      img.src = this.imgs[i];
      li.appendChild(img);
      ul.appendChild(li); 
    }
    return ul;
  }
}