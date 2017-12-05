'use strict';

const Layer = require('./layer.js');

class MarkAnimateLayer extends Layer {
  constructor(tree,
     intensity,
     baseDuration,
     durationVariance
    ) {

    if (baseDuration === undefined){
      baseDuration = 300;
    }

    if (durationVariance === undefined){
      durationVariance = 100;
    }

    super(tree);

    this.intensity = intensity;
    this.baseDuration = baseDuration;
    this.durationVariance = durationVariance;

    this.animState = [];

    for (var i = 0; i < this.tree.size; i++){
      this.animState.push({});
    }
  }

  isDuringAnimation(state, timestamp){
    if (state.start) {
      if (timestamp < state.start) { return false; }

      return timestamp < (state.start + state.duration);
    }

    return false;
  }

  distributeMarks(intensity, timestamp) {
    for(var i = 0; i < this.tree.size; i++){
      if (Math.random() < intensity) {
        this.animState[i].duration = this.baseDuration + (Math.random() - 0.5) * this.durationVariance;
        this.animState[i].start = timestamp;

        if(this.extraMarkActions){
          this.extraMarkActions(this.animState[i], timestamp);
        }
      }
    }
  }

  applyMarks(timestamp){
    for (var i = 0; i < this.tree.size; i++){
      var state = this.animState[i];

      var completion = (timestamp - state.start)/state.duration;
      completion = Math.min(Math.max(completion, 0), 1);

      this.evaluateState(state, completion, timestamp, this.colors[i]);
    }
  }

  update(timestamp){
    this.distributeMarks(this.intensity, timestamp);
    this.applyMarks(timestamp);
  }
}

module.exports = MarkAnimateLayer;
