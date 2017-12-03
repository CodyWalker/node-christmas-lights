'use strict';

const getTime = require('./getTime.js');

class FPSCounter {
  constructor(interval) {
    this.interval = interval;
    this.accumulator = 0;
    this.frames = 0;

    this.lastFrame = null;
  }

  frameRendered() {
    const time = getTime();

    this.accumulator += time - this.lastFrame;
    this.frames += 1;
    this.lastFrame = time;

    if (this.frames >= this.interval) {
      const averageFrame = this.accumulator / this.frames;
      const fps = 1000 / averageFrame;

      console.log('FPS:', fps);

      this.accumulator = 0;
      this.frames = 0;
    }
  }
}

module.exports = FPSCounter;
