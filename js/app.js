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
  }
  drawPoint = (event) => {
    if (this.click) {
      this.ctx.fillRect(event.layerX, event.layerY, this.pointSize, this.pointSize);
    }
  }
  changePoint = (pointSize, pointColor) => {
    this.pointSize = pointSize;
    this.pointColor = pointColor;

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