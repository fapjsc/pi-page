import { memberActionTypes } from "../types";

export const setMemberData = (data) => ({
  type: memberActionTypes.SET_MEMBER_DATA,
  payload: data,
});
