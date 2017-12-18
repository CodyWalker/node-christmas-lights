'use strict';

const Renderer = require('./renderer.js');
const { createStrands, mapPixels } = require('../utils/mapStrands.js');
const WebSocketAsPromised = require('websocket-as-promised');

class WebsocketRenderer extends Renderer {
  constructor(tree, port, host) {
    super(tree);

    this.socket = new WebSocketAsPromised(`ws://${host}:${port}`);
    this.openPromise = this.socket.open();

    // this.buffer = new Uint8Array(4 + (tree.size * 3));
    // this.buffer.fill(0);

    this.controlBuffer = new Buffer(4);
    this.controlBuffer.fill(0x00);

    this.strands = createStrands(tree);
  }

  update(colors) {
    var promise = new Promise((resolve, reject) => {
      const dataLength = this.tree.hardware.outputSize * 3;
      this.controlBuffer[2] = dataLength >> 8;
      this.controlBuffer[3] = dataLength & 0xff;

      mapPixels(this.strands, colors);

      const sendBuffer = Buffer.concat([this.controlBuffer, this.strands.masterStrand.buffer]);

      // for (var i = 0; i < this.tree.size; i++) {
      //   const offset = 4 + (i * 3);
      //
      //   this.buffer[offset + 0] = colors[i].values[0];
      //   this.buffer[offset + 1] = colors[i].values[1];
      //   this.buffer[offset + 2] = colors[i].values[2];
      // }

      this.openPromise.then(() => {
        return this.socket.send(sendBuffer)
      })
        .then(() => resolve())
    });

    return promise;
  }
}

module.exports = WebsocketRenderer;
