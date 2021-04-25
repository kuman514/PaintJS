'use strict';

class App {
  constructor() {
    // point
    this.pointSize = 8;
    this.pointColor = '#000000';
    this.click = false;
    this.prevCoord = [0, 0];

    // canvas
    this.canvas = document.getElementById('current-canvas');
    this.canvas.addEventListener('mousemove', this.drawPoint);
    this.canvas.addEventListener('mousedown', this.mouseDown);
    this.canvas.addEventListener('mouseup', this.mouseUp);
    this.ctx = this.canvas.getContext('2d');

    // canvas context
    this.ctx.fillStyle = this.pointColor;
    this.ctx.lineWidth = this.pointSize;
    this.ctx.strokeStyle = this.pointColor;

    // palette
    this.palette = document.querySelector('.palette');
    this.palette.addEventListener('change', this.changePoint);

    // save & load
    document.getElementById('save').addEventListener('click', this.saveToPNG);
    document.getElementById('load').addEventListener('click', this.loadImg);
    document.getElementById('clear').addEventListener('click', this.clear);
  }

  drawPoint = (event) => {
    if (this.click) {
      this.ctx.beginPath();
      this.ctx.arc(event.layerX, event.layerY, this.pointSize / 2, 0, Math.PI * 2, false);
      this.ctx.fill();

      this.ctx.beginPath();
      this.ctx.moveTo(this.prevCoord[0], this.prevCoord[1]);
      this.ctx.lineTo(event.layerX, event.layerY);
      this.ctx.stroke();
    }

    this.prevCoord = [event.layerX, event.layerY];
  }
  changePoint = (event) => {
    switch (event.target.id) {
      case 'color-range':
        this.pointSize = Number(event.target.value);
        break;
      case 'color-picker':
        this.pointColor = event.target.value;
        break;
    }
    this.ctx.fillStyle = this.pointColor;
    this.ctx.lineWidth = this.pointSize;
    this.ctx.strokeStyle = this.pointColor;
  }
  mouseDown = () => {
    this.click = true;
  }
  mouseUp = () => {
    this.click = false;
  }

  saveToPNG = () => {
    const url = this.canvas.toDataURL('png');
    let fileTarget = document.createElement('a');
    fileTarget.setAttribute('href', url);
    fileTarget.setAttribute('download', 'save.png');
    fileTarget.click();
  }
  loadImg = () => {
    let fileTarget = document.createElement('input');
    fileTarget.type = 'file';
    fileTarget.accept = 'image/png, image/jpeg';
    fileTarget.addEventListener('change', (e) => {
      let file = e.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        if (event.target.readyState === FileReader.DONE) {
          let img = new Image();
          img.src = event.target.result;
          img.onload = () => {
            this.ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, this.canvas.width, this.canvas.height);
          }
        }
      }
    });
    fileTarget.click();
  }
  clear = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

var app = null;
window.addEventListener('DOMContentLoaded', () => {
  app = new App();
});