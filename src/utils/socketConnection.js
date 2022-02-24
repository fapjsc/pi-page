import { io } from "socket.io-client";

import store from "../store/store";

import { setAgentConnectStatus } from "../store/actions/egmStatusActions";
import { setMemberData } from "../store/actions/memberActions";

import config from "../config/config.json";

let socket;
// const SERVER = 'http://192.168.10.119:3030';
const SERVER = config.AGENT_SERVER_IP;
const egmIP = config.EGM_IP;

export const connectWithAgentSocket = () => {
  socket = io(SERVER, {
    query: {
      ip: egmIP,
    },
  });

  socket.on("connect", (io) => {
    console.log("agent server connected");
    store.dispatch(setAgentConnectStatus("success"));
  });

  socket.on("egmTouchScreen", (data) => {
    console.log(data);
    store.dispatch(setMemberData(data));
    if (!data) {
      console.log("test");
      localStorage.removeItem("persist:root");
      localStorage.removeItem("locale");
    }
    // console.log(config.EGM_IP)
  });

  socket.on("disconnect", () => {
    console.log("disconnect");
    store.dispatch(setAgentConnectStatus("closed"));
  });

  socket.on("connect_error", (err) => {
    console.log(`connect_error`);
    store.dispatch(setAgentConnectStatus("error"));
  });

  socket.on("serviceBell", (data) => {
    console.log(data);
  });
};

export const closeSocket = () => {
  if (socket) socket.close();
};
