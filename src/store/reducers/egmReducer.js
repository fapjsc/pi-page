import {
  SET_EGM_CONNECTS_STATUS,
  SET_BONUS,
  SET_CASH_POINT,
  SET_PROMOTION,
  SET_AGENT_CONNECT_STATUS,
  SET_IP,
  SET_DENOMINATION,
} from "../types";
const connectionInitialState = {
  egmStatus: "pending",
  agentStatus: "pending",
  ip: "",
};

export const connectStatusReducers = (
  state = connectionInitialState,
  action
) => {
  switch (action.type) {
    case SET_EGM_CONNECTS_STATUS:
      return {
        ...state,
        egmStatus: action.status,
      };

    case SET_AGENT_CONNECT_STATUS:
      return {
        ...state,
        agentStatus: action.status,
      };
    default:
      return state;
  }
};

const egmDataInitialState = {
  bonus: 0,
  cashPoint: 0,
  promotion: 0,
  denomination: null,
};

export const egmDataReducers = (state = egmDataInitialState, action) => {
  switch (action.type) {
    case SET_BONUS:
      return {
        ...state,
        bonus: action.bonus,
      };

    case SET_CASH_POINT:
      return {
        ...state,
        cashPoint: action.cashPoint,
      };

    case SET_PROMOTION:
      return {
        ...state,
        promotion: action.promotion,
      };

    case SET_IP:
      return {
        ...state,
        ip: action.ip,
      };

    case SET_DENOMINATION:
      return {
        ...state,
        denomination: action.denomination,
      };
    default:
      return state;
  }
};
