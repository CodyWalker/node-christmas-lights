'use strict';

const RGBA = require('../color/rgba.js');

const transparentBlack = RGBA.fromValues(0, 0, 0, 0);

class Layer {
  constructor(tree) {
    this.tree = tree
    this.colors = [];

    for (var i = 0; i < this.tree.size; i++) {
      this.colors[i] = RGBA.clone(transparentBlack);
    }
  }

  update(timestamp) {

  }

  blend(colors) {
    for (var i = 0; i < this.colors.length; i++) {
      RGBA.composite(this.colors[i], this.colors[i], colors[i]);
    };

    return this.colors;
  }
}

module.exports = Layer
