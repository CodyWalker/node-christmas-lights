'use strict';

const Renderer = require('./renderer.js');
const WebSocketAsPromised = require('websocket-as-promised');

class WebsocketRenderer extends Renderer {
  constructor(tree, port, host) {
    super(tree);

    this.socket = new WebSocketAsPromised(`ws://${host}:${port}`);
    this.openPromise = this.socket.open();

    this.buffer = new Uint8Array(4 + (tree.size * 3));
    this.buffer.fill(0);
  }

  update(colors) {
    var promise = new Promise((resolve, reject) => {
      const dataLength = this.tree.size * 3;
      this.buffer[2] = dataLength >> 8;
      this.buffer[3] = dataLength & 0xff;

      for (var i = 0; i < this.tree.size; i++) {
        const offset = 4 + (i * 3);

        this.buffer[offset + 0] = colors[i].values[0];
        this.buffer[offset + 1] = colors[i].values[1];
        this.buffer[offset + 2] = colors[i].values[2];
      }

      this.openPromise.then(() => this.socket.send(this.buffer.buffer))
        .then(() => resolve())
    });

    return promise;
  }
}

module.exports = WebsocketRenderer;
