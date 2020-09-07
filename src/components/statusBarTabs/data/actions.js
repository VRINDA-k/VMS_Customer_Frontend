import {
  RESET_STATUS_TABS,
  SET_STATUS_TABS,
  CHANGE_STATUS_TAB
} from "./constants";

export function setStatusTabs(data) {
  return {
    type: SET_STATUS_TABS,
    payload: data
  };
}

export function resetStatusTabs() {
  return {
    type: RESET_STATUS_TABS
  };
}

export function changeStatusTab(data) {
  return {
    type: CHANGE_STATUS_TAB,
    payload: data
  };
}
