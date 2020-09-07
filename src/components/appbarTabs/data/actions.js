import { RESET_TABS, SET_TABS, CHANGE_TAB } from "./constants";

export function setTabs(data) {
  return {
    type: SET_TABS,
    payload: data
  };
}

export function resetTabs() {
  return {
    type: RESET_TABS
  };
}

export function changeTab(data) {
  return {
    type: CHANGE_TAB,
    payload: data
  };
}
