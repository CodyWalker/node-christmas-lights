'use strict';

class Renderer {
  constructor(tree) {
    this.tree = tree;
  }

  update(colors) {
    console.log("Null renderer rendering lights:", colors.length);
    
    var promise = new Promise((resolve, reject) => {
      resolve(); // Nothing to wait for in the null Renderer
    });

    return promise;
  }
}

module.exports = Renderer;
