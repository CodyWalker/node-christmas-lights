'use strict';

class Tree {
  constructor(config) {
    Object.assign(this, config); // XXX: Be more explicit about the feilds
  }

  getPoints() {
    return this.rawPoints;
  }
}

module.exports = Tree
