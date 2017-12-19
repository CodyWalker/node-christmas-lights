'use strict';
const vec3 = require('gl-matrix').vec3;
const pointAnalysis = require('./utils/pointAnalysis.js');

class Tree {
  constructor(config) {
    Object.assign(this, config); // XXX: Be more explicit about the feilds

    // TODO: validate size and rawPoints and strands

    this.normalizePoints();
  }

  normalizePoints() {
    const centroid = pointAnalysis.getCentroid(this.rawPoints);
    const minimumY = pointAnalysis.getMiniumY(this.rawPoints);

    const translation = vec3.fromValues(centroid[0], minimumY, centroid[2]);

    this.normalizedPoints = [];
    for (let i = 0; i < this.size; i++) {
      const point = vec3.create();
      vec3.subtract(point, this.rawPoints[i], translation);

      this.normalizedPoints.push(point);
    }

    const greatestLength = pointAnalysis.getGreatestLength(this.normalizedPoints);

    for (let i = 0; i < this.size; i++) {
      vec3.scale(this.normalizedPoints[i], this.normalizedPoints[i], 1 / greatestLength);
    }
  }

  getPoints() {
    return this.normalizedPoints;
  }
}

module.exports = Tree
