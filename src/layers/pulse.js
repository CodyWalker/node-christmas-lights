'use strict';

const RGBA = require('../color/rgba.js');
const Layer = require('./layer.js');


const color1 = RGBA.fromValues(0, 0, 0, 0);
const color2 = RGBA.fromValues(255, 255, 255, 1);

class Pulse extends Layer {
  constructor(tree, frequency) {
    super(tree);

    this.frequency = frequency;
    this.frame = 16.66;
    this.duration = tree.size * this.frame * 2;

    this.scheduleNext(0);
  }

  scheduleNext(timestamp) {
    this.nextRun = timestamp + this.frequency;
  }

  update(timestamp){
    var endRun = this.nextRun + this.duration;

    if(timestamp > this.nextRun && timestamp < endRun) {
      var frame = Math.round((timestamp - this.nextRun) / this.frame);
      var startLight = Math.max(0, frame - this.tree.size);
      var endLight = Math.min(frame, this.tree.size);

      for(var i = 0; i < endLight; i++){
        if (i < startLight){
          RGBA.copy(this.colors[i], color1);
        } else {
          RGBA.copy(this.colors[i], color2);
        }
      }
    } else if (timestamp > endRun) {
      for (var i = 0; i < this.tree.size; i++) {
        RGBA.copy(this.colors[i], color1);
      }

      this.scheduleNext(timestamp);
    }
  }
}

module.exports = Pulse
