import { memberActionTypes } from "../types";

const initialState = {
  memberData: {},
};

export const memberReducer = (state = initialState, action) => {
  switch (action.type) {
    case memberActionTypes.SET_MEMBER_DATA:
      return {
        ...state,
        memberData: action.payload,
      };
    default:
      return state;
  }
};
