import { SHOW_ALERT } from "./constants";

export function showAlert(data) {
  return {
    type: SHOW_ALERT,
    payload: data
  };
}
