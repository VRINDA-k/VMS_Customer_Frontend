import { SET_HEADER } from "./constants";

const initialState = {
  header: ""
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_HEADER:
      return {
        header: payload.header
      };
    default:
      return state;
  }
};
