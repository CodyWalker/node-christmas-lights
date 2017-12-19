'use strict';
const vec3 = require('gl-matrix').vec3;

function getCentroid(points) {
  const accumulator = vec3.create();

  for (let i = 0; i < points.length; i++) {
    vec3.add(accumulator, accumulator, points[i]);
  }

  return vec3.scale(accumulator, accumulator, 1 / points.length);
}

function getMiniumY(points) {
  let minimumY = points[0][1];

  for (let i = 1; i < points.length; i++) {
    if (points[i][1] < minimumY) {
      minimumY = points[i][1];
    }
  }

  return minimumY;
}

function getGreatestLength(points) {
  let longest = vec3.length(points[0]);

  for (let i = 1; i < points.length; i++) {
    const len = vec3.length(points[i]);

    if (len > longest) {
      longest = len;
    }
  }

  return longest;
}

module.exports = {
  getCentroid,
  getMiniumY,
  getGreatestLength
}
