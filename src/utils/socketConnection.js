import { io } from 'socket.io-client';

import store from '../store/store';

import { setAgentConnectStatus } from '../store/actions/egmStatusActions';

import config from '../config/config.json';

let socket;
// const SERVER = 'http://192.168.10.119:3030';
const SERVER = config.AGENT_SERVER_IP;

export const connectWithAgentSocket = () => {
  socket = io(SERVER);

  socket.on('connect', io => {
    console.log('agent server connected');
    store.dispatch(setAgentConnectStatus('success'));
  });

  socket.on('disconnect', () => {
    console.log('disconnect');
    store.dispatch(setAgentConnectStatus('closed'));
  });

  socket.on('connect_error', err => {
    console.log(`connect_error`);
    store.dispatch(setAgentConnectStatus('error'));
  });

  socket.on('serviceBell', data => {
    console.log(data);
  });
};

export const closeSocket = () => {
  if (socket) socket.close();
};
