import {
  SET_STATUS_TABS,
  RESET_STATUS_TABS,
  CHANGE_STATUS_TAB
} from "./constants";

const initialState = {
  statusTabs: [],
  activeTab: 0
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_STATUS_TABS:
      return {
        ...state,
        statusTabs: payload.tabs
      };
    case RESET_STATUS_TABS:
      return {
        statusTabs: [],
        activeTab: 0
      };
    case CHANGE_STATUS_TAB:
      return {
        ...state,
        activeTab: payload.value
      };
    default:
      return state;
  }
};
