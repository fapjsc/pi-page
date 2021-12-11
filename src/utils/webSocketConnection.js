import ReconnectingWebSocket from "reconnecting-websocket";
// import { w3cwebsocket as W3CWebsocket } from 'websocket';

import store from "../store/store";

import config from "../config/config.json";

import {
  setEgmConnectStatus,
  setCashPoint,
  setPromotion,
} from "../store/actions/egmStatusActions";

import { sliceZero } from "./helpers";

import { getDenomination, getDenominationTable } from "../utils/denomination";

// const SERVER = "ws://192.168.10.76:8098/websocket";
// const SERVER = "ws://localhost:8098/websocket";
// const WEBSOCKET_SERVER = "ws://localhost:8098/websocket";
const WEBSOCKET_SERVER = `ws://${config.EGM_IP}:8098/websocket`;

let client;

let cashTemp;
let promotionTmp;

// const options = {
//   //   connectionTimeout: 1000,
// };

export const connectWithEgm = () => {
  client = new ReconnectingWebSocket(WEBSOCKET_SERVER);
  //   client = new W3CWebsocket(SERVER);

  // 1.建立連接
  client.onopen = () => {
    console.log("egm connected");
    store.dispatch(setEgmConnectStatus("success"));
  };

  // 2.連線關閉
  client.onclose = () => {
    console.log("Connection Error");
    store.dispatch(setEgmConnectStatus("closed"));
  };

  // 3.連線錯誤
  client.onerror = () => {
    console.log("Connection Error");
    store.dispatch(setEgmConnectStatus("error"));
  };

  // 4.收到server回復
  client.onmessage = (message) => {
    // 0x1A => 現金點數 cashPoint
    // 0x6F => 尼瑪點數 campaign
    const data = JSON.parse(message.data);


    // Cash Point
    if (getDenominationTable(data.code)) {
      const cashPoint = sliceZero(data.value);
      if (cashTemp === cashPoint) return;

      cashTemp = cashPoint;

      if (config.devConfig.egmBrand === "Igt") {
        // console.log(cashPoint / 100)
       
        store.dispatch(setCashPoint(cashPoint / 100));
      } else {
        store.dispatch(setCashPoint(getDenomination(cashPoint, data.code)));
      }
    }

    // Promotion
    if (data.code === "0x6F") {
      const promotion = sliceZero(data.value);
      if (promotionTmp === promotion) return;
      promotionTmp = promotion;
      store.dispatch(setPromotion(getDenomination(promotion, "6F")));
    }
  };
};

export const closeEgmConnect = () => {
  // console.log(client);
  client?.close();
};
