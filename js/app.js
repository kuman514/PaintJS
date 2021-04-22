'use strict'

class App {
  constructor() {
    this.pointSize = 8;
    this.pointColor = '#000000';
    this.click = false;

    this.canvas = document.getElementById('current-canvas');
    this.canvas.addEventListener('mousemove', this.drawPoint);
    this.canvas.addEventListener('mousedown', this.mouseDown);
    this.canvas.addEventListener('mouseup', this.mouseUp);

    this.ctx = this.canvas.getContext('2d');
    this.ctx.fillStyle = this.pointColor;

    this.palette = document.querySelector('.palette');
    this.palette.addEventListener('change', this.changePoint);

    document.getElementById('save').addEventListener('click', this.saveToPNG);
    document.getElementById('load').addEventListener('click', this.loadImg);
  }

  drawPoint = (event) => {
    if (this.click) {
      this.ctx.beginPath();
      this.ctx.arc(event.layerX, event.layerY, this.pointSize / 2, 0, Math.PI * 2, false);
      this.ctx.fill();
    }
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
            this.ctx.drawImage(img, 0, 0);
          }
        }
      }
    });
    fileTarget.click();
  }
}

var app = null;
window.addEventListener('DOMContentLoaded', () => {
  app = new App();
});