'use strict';

const Layer = require('./layer.js');
const Color = require('color2');

class Background extends Layer {
  constructor(tree) {
    super(tree);

    for (var i = 0; i < this.tree.size; i++) {
      this.colors[i] = Color('rgba(0,0,0,1)');
    }
  }

  update(timestamp) {

  }

  blend(colors) {
    return this.colors;
  }
}

module.exports = Background
