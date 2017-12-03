'use strict';

require('./utils/color-prototype.js');

const Renderer = require('./renderers/renderer.js');
const Tree = require('./tree.js');
const Layer = require('./layers/layer.js');
const Background = require('./layers/background.js');

const tree = new Tree({ size: 100 });

const background = new Background(tree);
const layer = new Layer(tree);

const renderer = new Renderer(tree);
renderer.update(layer.blend(background.colors));
