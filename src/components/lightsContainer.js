import React from 'react';

const FPSCounter = require('../utils/fpsCounter');

const WebsocketRenderer = require('../renderers/websocket.js');
const Tree = require('../tree.js');
const Background = require('../layers/background.js');
const CalibrationLayer = require('../layers/calibration.js');

const saturatedBitmaticolors = require('../palettes/saturatedBitmaticolors.js');


class LightsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.tree = new Tree({
      size: 200,
      hardware: {
        outputSize: 800,
        strands: [
          {
            start: 0,
            end: 50
          },
          {
            start: 100,
            end: 150
          },
        ]
      }
    });

    this.background = new Background(this.tree);
    this.calibrationLayer = new CalibrationLayer(this.tree);

    this.renderer = new WebsocketRenderer(this.tree, 7891, "172.16.1.170");

    this.fpsCounter = new FPSCounter(100);
  }

  componentDidMount() {
    this.renderFrame.bind(this)();
  }

  renderFrame() {
    const frameTime = performance.now();

    this.calibrationLayer.currentLight = this.props.currentLight;
    this.calibrationLayer.update(frameTime);

    const frameColors = this.calibrationLayer.blend(this.background.colors);

    this.renderer.update(frameColors).then(() => {
      const renderTime = performance.now() - frameTime;
      const frameDelay = Math.max(0, 16 - renderTime);
      this.fpsCounter.frameRendered();

      setTimeout(this.renderFrame.bind(this), frameDelay);
    })
  }

  render() {
    return (<span>
    </span>);
  }

}

export default LightsContainer;
