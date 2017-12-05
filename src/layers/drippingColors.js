'use strict';

const easeIn = require('eases/expo-in')

const MarkAnimateLayer = require('./markAnimate.js');
const RGBA = require('../color/rgba.js');

class DrippingColors extends MarkAnimateLayer {
  constructor(tree, palette, intensity) {
    if (intensity === undefined){
      intensity = 0.001;
    }

    super(tree, intensity, 600, 50);

    this.palette = palette;

    for (var i = 0; i < this.tree.size; i++) {
      const randomColor = this.palette.randomColor()
      this.animState[i].endColor = RGBA.clone(randomColor);
      this.animState[i].startColor = RGBA.clone(randomColor);
    }
  }

  extraMarkActions(state, timestamp) {
    RGBA.copy(state.startColor, state.endColor);
    RGBA.copy(state.endColor, this.palette.randomColor());
  }

  evaluateState(state, completion, timestamp, output){
    if (this.isDuringAnimation(state, timestamp)){
      var blend = easeIn(completion);
      RGBA.mix(output, state.startColor, state.endColor, blend);
    } else {
      RGBA.copy(output, state.endColor);
    }
  }
}

module.exports = DrippingColors;
