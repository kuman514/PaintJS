'use strict'

class App {
  constructor() {
    this.pointSize = 8;
    this.pointColor = '#000000';
    this.click = false;

    this.canvas = document.getElementById('current-canvas')
    this.canvas.addEventListener('mousemove', this.drawPoint);
    this.canvas.addEventListener('mousedown', this.mouseDown);
    this.canvas.addEventListener('mouseup', this.mouseUp);

    this.ctx = this.canvas.getContext('2d');
    this.ctx.fillStyle = this.pointColor;

    this.palette = document.querySelector('.palette');
    this.palette.addEventListener('change', this.changePoint)
  }
  drawPoint = (event) => {
    if (this.click) {
      this.ctx.fillRect(event.layerX, event.layerY, this.pointSize, this.pointSize);
    }
  }
  changePoint = (event) => {
    console.log(event.target.id);
    switch (event.target.id) {
      case 'color-range':
        this.pointSize = Number(event.target.value);
        break;
      case 'color-picker':
        this.pointColor = event.target.value;
        break;
    }
    this.ctx.fillStyle = this.pointColor;
  }
  mouseDown = () => {
    this.click = true;
  }
  mouseUp = () => {
    this.click = false;
  }
}

var app = null;
window.addEventListener('DOMContentLoaded', () => {
  app = new App();
});