import {
  SET_EGM_CONNECTS_STATUS,
  SET_CASH_POINT,
  SET_PROMOTION,
  SET_AGENT_CONNECT_STATUS,
} from '../types';

export const setEgmConnectStatus = val => {
  return {
    type: SET_EGM_CONNECTS_STATUS,
    status: val,
  };
};

export const setAgentConnectStatus = status => {
  return {
    type: SET_AGENT_CONNECT_STATUS,
    status,
  };
};

export const setCashPoint = cashPoint => {
  return {
    type: SET_CASH_POINT,
    cashPoint,
  };
};

export const setPromotion = promotion => {
  return {
    type: SET_PROMOTION,
    promotion,
  };
};
