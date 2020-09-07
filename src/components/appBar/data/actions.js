import { SET_HEADER } from "./constants";

export function setHeader(data) {
  return {
    type: SET_HEADER,
    payload: data
  };
}
