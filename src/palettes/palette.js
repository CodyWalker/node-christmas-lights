'use strict';

const RGBA = require('../color/rgba.js');
const random = require('lodash/random');

class Palette {
  constructor(colors) {
    if (colors === undefined){
      this.colors = [
        RGBA.fromHex(0xFF8007),
      ];
    } else {
      this.colors = colors;
    }
  }

  randomColor() {
    return this.colors[random(this.colors.length - 1)];
  }
}

module.exports = Palette;
