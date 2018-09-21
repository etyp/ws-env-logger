import DDPClient from './ddp-client';
import SimpleWebsocket from './plain-websocket';

const URLS = {
  DNS: 'wss://app.hive.com/websocket',
  NGINX: 'ws://127.0.0.1:80/websocket',
  DIRECT: 'ws://127.0.0.1:8081/websocket',
};

const ddpClient = new DDPClient({ url: URLS.DNS });
ddpClient.connect();

const ws = new SimpleWebsocket({ url: URLS.DNS });
ws.connect();

console.log('Server running at http://127.0.0.1:1337/');