import { io } from 'socket.io-client';

import store from '../store/store';

import { setAgentConnectStatus } from '../store/actions/egmStatusActions';

let socket;
const SERVER = 'http://192.168.10.119:3030';

export const connectWithSocket = () => {
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
};

// export const closeSocket = () => {
//   socket.close();
// };
