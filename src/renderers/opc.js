'use strict';

const Socket = require("net").Socket;
const createOPCStream = require("opc");
const mapStrands = require('../utils/mapStrands.js');

const Renderer = require('./renderer.js');

class OPCRenderer extends Renderer {
  constructor(tree, port, host) {
    super(tree);

    this.socket = new Socket();
    this.socket.setNoDelay();
    this.socket.connect(port, host);

    this.stream = createOPCStream();
    this.stream.pipe(this.socket);

    // this.strand = createStrand(800);
    this.strands = mapStrands.createStrands(tree);
  }

  update(colors) {
    var promise = new Promise((resolve, reject) => {
      mapStrands.mapPixels(this.strands, colors);

      // Write the pixel colors to the device on channel 0
      this.stream.writePixels(0, this.strands.masterStrand.buffer);
      resolve();
    });

    return promise;
  }
}

module.exports = OPCRenderer;
