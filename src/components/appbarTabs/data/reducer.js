import { SET_TABS, RESET_TABS, CHANGE_TAB } from "./constants";

const initialState = {
  tabs: [],
  activeTab: 0
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_TABS:
      return {
        ...state,
        tabs: payload.tabs
      };
    case RESET_TABS:
      return {
        tabs: [],
        activeTab: 0
      };
    case CHANGE_TAB:
      return {
        ...state,
        activeTab: payload.value
      };
    default:
      return state;
  }
};
