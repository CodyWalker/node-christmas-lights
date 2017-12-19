const RGBA = require('../color/rgba.js');
const Layer = require('./layer.js');

const vec3 = require('gl-matrix').vec3;
const random = require('lodash/random')

const blackColor = RGBA.fromValues(0, 0, 0, 1);

class CubeThing extends Layer {
  constructor(tree, palette) {
    super(tree);
    this.cubeCenter = vec3.fromValues(0, 0.5, 0);
    this.size = 0.35 / 2; // This gets doubled because we measure from the center

    this.palette = palette;
  }

  update(timestamp){
    const points = this.tree.getPoints();
    const cycle = timestamp/2000;
    const color = Math.floor(cycle + 0.25) % this.palette.colors.length

    this.size = (Math.sin(cycle * 2 * Math.PI) + 1) * 0.25;

    const delta = vec3.create();
    for (let i = 0; i < this.tree.size; i++) {
      vec3.subtract(delta, points[i], this.cubeCenter);

      if (
        Math.abs(delta[0]) < this.size &&
        Math.abs(delta[1]) < this.size &&
        Math.abs(delta[2]) < this.size
      ) {
        RGBA.copy(this.colors[i], this.palette.colors[color]);
      } else {
        RGBA.copy(this.colors[i], blackColor);
      }
    }
  }
}

module.exports = CubeThing;
