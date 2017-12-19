'use strict';

const getTime = require('./utils/getTime.js');
const FPSCounter = require('./utils/fpsCounter');

const OPCRenderer = require('./renderers/opc.js');
const Tree = require('./tree.js');
const Pulse = require('./layers/pulse.js');
const Background = require('./layers/background.js');
const DrippingColors = require('./layers/drippingColors.js');
const PlaneSweep = require('./layers/planeSweep.js');
const CubeThing = require('./layers/cubeThing.js');

const saturatedBitmaticolors = require('./palettes/saturatedBitmaticolors.js');

const RGBA = require('./color/rgba.js');

const treeOptions = require('./tree.json');

const tree = new Tree(treeOptions);

const background = new Background(tree);
//const drippingColors = new DrippingColors(tree, saturatedBitmaticolors, 0.003);
//const pulse = new Pulse(tree, 1000);
const planeSweep = new PlaneSweep(tree, saturatedBitmaticolors);
//const cubeThing = new CubeThing(tree, saturatedBitmaticolors);

const renderer = new OPCRenderer(tree, 7890, "10.33.8.190");

const fpsCounter = new FPSCounter(100);

function renderFrame() {
  const frameTime = getTime();

  planeSweep.update(frameTime);

  const frameColors = planeSweep.blend(background.colors);

  renderer.update(frameColors).then(() => {
    const renderTime = getTime() - frameTime;
    const frameDelay = Math.max(0, 16 - renderTime);
    fpsCounter.frameRendered();

    setTimeout(renderFrame, frameDelay);
  })
}

renderFrame();
