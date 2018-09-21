import DDPClient from './ddp-client';
import SimpleWebsocket from './plain-websocket';

const URLS = {
  DNS: 'wss://app.hive.com/websocket',
  NGINX: 'ws://127.0.0.1:80/websocket',
  DIRECT: 'ws://127.0.0.1:8081/websocket',
};

Object.keys(URLS).forEach((entryPoint) => {
  const url = URLS[entryPoint];
  console.log(`Setting up entry point "${entryPoint}" for DDPClient`);
  const ddpClient = new DDPClient({ url, autoReconnect: false });
  ddpClient.connect();
  
  console.log(`Setting up entry point "${entryPoint}" for SimpleWebsocket`);
  const ws = new SimpleWebsocket({ url });
  ws.connect();
});
