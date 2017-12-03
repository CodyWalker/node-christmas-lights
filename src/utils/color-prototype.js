'use strict';

const Color = require('color2');
const composite = require('./composite.js');

// We need to get our composited colors back into our color format. To avoid any
// memory allocations we'll add a destructive method.
Color.prototype.over = function (color) {
  const result = composite.over(this, color);

  this.parse(result.values, result.space);
  this.alpha(result.alpha);

  return this;
}
