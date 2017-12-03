'use strict';

const Layer = require('./layer.js');
const RGBA = require('../color/rgba.js');

const black = RGBA.fromValues(0, 0, 0, 1);

class Background extends Layer {
  constructor(tree) {
    super(tree);

    for (var i = 0; i < this.tree.size; i++) {
      RGBA.copy(this.colors[i], black);
    }
  }

  update(timestamp) {

  }

  blend(colors) {
    return this.colors;
  }
}

module.exports = Background
