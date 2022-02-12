import ReconnectingWebSocket from "reconnecting-websocket";
// import { w3cwebsocket as W3CWebsocket } from 'websocket';

import store from "../store/store";

import config from "../config/config.json";

import {
  setEgmConnectStatus,
  setBonus,
  setCashPoint,
  setPromotion,
  setDenomination,
} from "../store/actions/egmStatusActions";

import { sliceZero } from "./helpers";

import { getDenomination, getDenominationTable } from "../utils/denomination";

// const SERVER = "ws://192.168.10.76:8098/websocket";
// const SERVER = "ws://localhost:8098/websocket";
// const WEBSOCKET_SERVER = "ws://localhost:8098/websocket";
const WEBSOCKET_SERVER = `ws://${config.EGM_IP}:8098/websocket`;

let client;

let bonusTmp;
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
    // console.log(JSON.parse(message.data).value)
    console.log(
      `%c${JSON.parse(message.data).code}`,
      "color:green",
      JSON.parse(message.data).value
    );

    // Set denomination
    if (data.denomination) {
      console.log(data.denomination);
      store.dispatch(setDenomination(data.denomination));
    }

    // Cash Point
    if (data.code === "0x1A") {
      const cashPoint = sliceZero(data.value);
      if (cashPoint === cashTemp) return;
      cashTemp = cashPoint;
      const denomination = store.getState().egmData.denomination;
      let cash = getDenomination(cashPoint, denomination);

      if (promotionTmp) {
        const promo = getDenomination(promotionTmp, denomination);
        cash = cash - promo;
      }
      store.dispatch(setCashPoint(cash.toString()));

    }

    // Promotion
    if (data.code === "0x6F") {
      const promotion = sliceZero(data.value);
      // let cash = store.getState().egmData.cashPoint;
      if (promotionTmp === promotion) return;
      promotionTmp = promotion;
      const denomination = store.getState().egmData.denomination;
      const promo = getDenomination(promotion, denomination);
      store.dispatch(setPromotion(promo.toString()));

      if (cashTemp) {
        let allPoint = getDenomination(cashTemp, denomination);
        const cash = allPoint - promo;
        store.dispatch(setCashPoint(cash.toString()));
      }
    }

    // bonus
    if (data.code === "0x11") {
      const bonus = sliceZero(data.value);
      // if (bonusTmp === bonus) return;
      bonusTmp = bonus;
      console.log(bonus);
      store.dispatch(setBonus(bonus.toString()));
    }
  };
};

export const closeEgmConnect = () => {
  // console.log(client);
  client?.close();
};

export const sendDenominationText = () => {
  client.send("denomination");
};
