const RGBA = require('../color/rgba.js');
const Layer = require('./layer.js');

const vec3 = require('gl-matrix').vec3;
const random = require('lodash/random')

const blackColor = RGBA.fromValues(0, 0, 0, 1);

class PlaneSweep extends Layer {
  constructor(tree, palette) {
    super(tree);
    this.centroid = vec3.fromValues(0, 0, 0);
    this.radius = 2;

    for (var i = 0; i < tree.size; i++) {
      RGBA.copy(this.colors[i], blackColor);
    }

    this.palette = palette;

    this.frequency = 6000;
    this.probability = .01;

    this.planes = [];

    this.addPlane(0);
  }

  addPlane(timestamp) {
    const planeNormal = vec3.create();
    vec3.random(planeNormal, 1);

    this.planes.push({
      normal: planeNormal,
      color: this.palette.randomColor(),
      start: timestamp,
      durration: random(this.frequency * 0.5, this.frequency * 1.5)
    });
  }

  renderPlane(plane, frameBuffer, timestamp){
    let dbg = [];

    const points = this.tree.getPoints();
    var relativeTime = timestamp - plane.start;
    var amount = Math.min(1, relativeTime / plane.durration);
    const translation = (amount * this.radius * 2) - this.radius;

    for (var i = 0; i < this.tree.size; i++) {
      const target = vec3.create();
      vec3.subtract(target, points[i], this.centroid);

      const distance = vec3.dot(plane.normal, target) + translation;

      if (distance < 0) {
        dbg[i] = 1;
      } else {
        RGBA.copy(this.colors[i], plane.color);
        dbg[i] = 0;
      }
    }
  }

  update(timestamp){
    this.planes.forEach((plane) => {
      this.renderPlane(plane, this.colors, timestamp);
    });

    if(Math.random() < this.probability) {
      this.addPlane(timestamp);
    }

    if(this.planes.length > 1) {
      var firstEnd = this.planes[0].start + this.planes[0].durration;
      var secondEnd = this.planes[1].start + this.planes[1].durration;

      if(firstEnd < timestamp && secondEnd < timestamp) {
        this.planes.shift();
      }
    }
  }
}

module.exports = PlaneSweep;
