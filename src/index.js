'use strict';

const getTime = require('./utils/getTime.js');
const FPSCounter = require('./utils/fpsCounter');

const OPCRenderer = require('./renderers/opc.js');
const Tree = require('./tree.js');
const Pulse = require('./layers/pulse.js');
const Background = require('./layers/background.js');
const DrippingColors = require('./layers/drippingColors.js');

const saturatedBitmaticolors = require('./palettes/saturatedBitmaticolors.js');

const RGBA = require('./color/rgba.js');



const tree = new Tree({ size: 800 });

const background = new Background(tree);
const drippingColors = new DrippingColors(tree, saturatedBitmaticolors, 0.003);
//const pulse = new Pulse(tree, 1000);

const renderer = new OPCRenderer(tree, 7890, "192.168.7.2");

const fpsCounter = new FPSCounter(100);

function renderFrame() {
  const frameTime = getTime();

  drippingColors.update(frameTime);

  const frameColors = drippingColors.blend(background.colors);

  renderer.update(frameColors).then(() => {
    const renderTime = getTime() - frameTime;
    const frameDelay = Math.max(0, 16 - renderTime);
    fpsCounter.frameRendered();

    setTimeout(renderFrame, frameDelay);
  })
}

renderFrame();
