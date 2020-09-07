import { OPEN_SIDEDRAWER, CLOSE_SIDEDRAWER } from "./constants";

const initialState = {
  isSideDrawerOpen: false,
  isLoading: false
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case OPEN_SIDEDRAWER:
      return {
        isSideDrawerOpen: true
      };
    case CLOSE_SIDEDRAWER:
      return {
        isSideDrawerOpen: false
      };

    default:
      return state;
  }
};
