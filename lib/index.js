import winston from 'winston';
require('winston-papertrail');
import DDPClient from './ddp-client';
import SimpleWebsocket from './plain-websocket';

const setupLogger = (name = 'default') => {
  const hostname = `ping-pong-ws-${name}`;
  const papertrailOptions = {
    host: 'logs4.papertrailapp.com',
    port: process.env.PT_PORT || 42738,
    hostname,
    handleExceptions: true,
    colorize: false,
    attemptsBeforeDecay: 1,
    connectionDelay: 1000 * 10,
    maxDelayBetweenReconnection: 1000 * 60 * 60,
  };
  
  const pt = new winston.transports.Papertrail(papertrailOptions);
  const logger = new winston.Logger({
    transports: [pt],
  });
  return (msg) => {
    logger.info(`[${name}] ${msg}`);
  };
};

const URLS = {
  DNS: 'wss://app.hive.com/websocket',
  NGINX: 'ws://127.0.0.1:80/websocket',
  DIRECT: 'ws://127.0.0.1:8081/websocket',
};

Object.keys(URLS).forEach((entryPoint) => {
  const url = URLS[entryPoint];
  const ddpLogger = setupLogger(`ddp-${entryPoint}`);
  console.log(`Setting up entry point "${entryPoint}" for DDPClient`);
  const ddpClient = new DDPClient({ url, logger: ddpLogger, autoReconnect: false });
  ddpClient.connect();
  
  const plainWsLogger = setupLogger(`plain-ws-${entryPoint}`);
  console.log(`Setting up entry point "${entryPoint}" for SimpleWebsocket`);
  const ws = new SimpleWebsocket({ url, logger: plainWsLogger });
  ws.connect();
});
