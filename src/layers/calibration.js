'use strict';

const RGBA = require('../color/rgba.js');
const Layer = require('./layer.js');

const color1 = RGBA.fromValues(0, 0, 0, 0);
const color2 = RGBA.fromValues(255, 255, 255, 1);

class Calibration extends Layer {
  constructor(tree) {
    super(tree);

    this.currentLight = 0;
  }

  update(timestamp){
    for (var i = 0; i < this.tree.size; i++) {
      if (i === this.currentLight) {
        RGBA.copy(this.colors[i], color2);
      } else {
        RGBA.copy(this.colors[i], color1);
      }
    }
  }
}

module.exports = Calibration
