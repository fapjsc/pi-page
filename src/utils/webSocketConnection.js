import ReconnectingWebSocket from 'reconnecting-websocket';

import store from '../store/store';

import {
  setEgmConnectStatus,
  setCashPoint,
  setPromotion,
} from '../store/actions/egmStatusActions';

import { sliceZero } from './helpers';

const SERVER = 'ws://192.168.10.73:8098/websocket';
let client;

let cashTemp;
let promotionTmp;

export const connectWithEgm = () => {
  client = new ReconnectingWebSocket(SERVER);

  // 1.建立連接
  client.onopen = () => {
    console.log('egm connected');
    store.dispatch(setEgmConnectStatus('success'));
  };

  // 2.收到server回復
  client.onmessage = message => {
    // 0x1A => 現金點數 cashPoint
    // 0x6F => 尼瑪點數 campaign
    const data = JSON.parse(message.data);

    // Cash Point
    if (data.code === '0x1A') {
      const cashPoint = sliceZero(data.value);
      if (cashTemp === cashPoint) return;
      cashTemp = cashPoint;
      store.dispatch(setCashPoint(cashPoint));
    }

    // Promotion
    if (data.code === '0x6F') {
      const promotion = sliceZero(data.value);
      if (promotionTmp === promotion) return;
      promotionTmp = promotion;
      store.dispatch(setPromotion(promotion));
    }

    // console.log(data);
  };

  //3. 連線關閉
  client.onclose = message => {
    console.log('websocket client closed');
    store.dispatch(setEgmConnectStatus('closed'));
  };

  // 4.連線錯誤
  client.onerror = err => {
    console.error(err);
    store.dispatch(setEgmConnectStatus('error'));
  };
};
