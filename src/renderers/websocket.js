'use strict';

const Renderer = require('./renderer.js');
const { createStrands, mapPixels } = require('../utils/mapStrands.js');
const WebSocketAsPromised = require('websocket-as-promised');

class WebsocketRenderer extends Renderer {
  constructor(tree, port, host) {
    super(tree);

    this.socket = new WebSocketAsPromised(`ws://${host}:${port}`);
    this.openPromise = this.socket.open();

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

      this.openPromise.then(() => {
        return this.socket.send(sendBuffer)
      })
        .then(() => resolve())
    });

    return promise;
  }
}

module.exports = WebsocketRenderer;
