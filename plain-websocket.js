import WebSocket from 'ws';
import EJSON from 'ejson';
import _  from 'underscore';

class SimpleWebsocket {
  constructor({ url = 'ws://localhost:3000/websocket', logger = console.log } = {}) {
    this.url = url;
    this.log = (msg) => {
      logger(`[SimpleWebsocket] ${msg}`);
    };
  }

  connect() {
    this.socket = new WebSocket(this.url);
    this._prepareHandlers();
  }

  _send(data) {
    this.log(`[_send] ${EJSON.stringify(data)}`);
    this.socket.send(
      EJSON.stringify(data)
    );
  }

  _message(data) {
    const self = this;
    this.log(EJSON.stringify(data));
    data = EJSON.parse(data);
    if (!data.msg) {
      this.log(`[_message] no message`);
      return;
    } else if (data.msg === 'failed') {
      this.log(`[_message] failed`);
    } else if (data.msg === 'connected') {
      this.log(`[_message] connected`);
    } else if (data.msg === 'ping') {
      this.log(`[_message] ping`);
      self._send(
        _.has(data, 'id') ? { msg : 'pong', id : data.id } : { msg : 'pong' }
      );
    }
  }

  _prepareHandlers() {
    this.log(`[_prepareHandlers]`);
    const self = this;
    self.socket.onopen = () => {
      this.log(`[onopen]`);
      // just go ahead and open the connection on connect
      self._send({
        msg : 'connect',
        version : '1',
        support : [ '1', 'pre2', 'pre1' ]
      });
    };

    self.socket.onerror = (error) => {
      this.log(`[onerror] ${error.message}`);
    };

    self.socket.onclose = (event) => {
      this.log(`[onclose] ${event.code} ${event.reason}`);
    };

    self.socket.onmessage = (event) => {
      self._message(event.data);
    };
  }
}

module.exports = SimpleWebsocket;
