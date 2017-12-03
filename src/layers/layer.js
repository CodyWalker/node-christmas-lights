'use strict';

const Color = require('color2');
//const composite = require('../utils/composite.js')

class Layer {
  constructor(tree) {
    this.tree = tree
    this.colors = [];

    for (var i = 0; i < this.tree.size; i++) {
      this.colors[i] = Color('rgba(255,0,0,0.25)');
    }
  }

  update(timestamp) {

  }

  blend(colors) {
    var result = [];

    for (var i = 0; i < this.colors.length; i++) {
      result[i] = this.colors[i].over(colors[i]);
    };

    return result;
  }
}

module.exports = Layer
