'use strict';

const Socket = require("net").Socket;
const createOPCStream = require("opc");
const createStrand = require("opc/strand");

const Renderer = require('./renderer.js');

class OPCRenderer extends Renderer {
  constructor(tree, port, host) {
    super(tree);

    this.socket = new Socket();
    this.socket.setNoDelay();
    this.socket.connect(port, host);

    this.stream = createOPCStream();
    this.stream.pipe(this.socket);

    this.strand = createStrand(800);
  }

  update(colors) {
    var promise = new Promise((resolve, reject) => {
      for (var i = 0; i < this.tree.size; i++) {
        this.strand.setPixel(i, colors[i].values[0], colors[i].values[1], colors[i].values[2]);
      }

      // Write the pixel colors to the device on channel 0
      this.stream.writePixels(0, this.strand.buffer);
      resolve();
    });

    return promise;
  }
}

module.exports = OPCRenderer;
