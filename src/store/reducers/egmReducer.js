import {
  SET_EGM_CONNECTS_STATUS,
  SET_CASH_POINT,
  SET_PROMOTION,
  SET_AGENT_CONNECT_STATUS,
} from '../types';
const connectionInitialState = {
  egmStatus: 'pending',
  agentStatus: 'pending',
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
  cashPoint: null,
  promotion: null,
};

export const egmDataReducers = (state = egmDataInitialState, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};
