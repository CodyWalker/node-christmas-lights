'use strict';

class Renderer {
  constructor(tree) {
    this.tree = tree;
  }

  update(colors) {
    var promise = new Promise((resolve, reject) => {
      resolve(); // Nothing to wait for in the null Renderer
    });

    return promise;
  }
}

module.exports = Renderer;
