import { SHOW_ALERT } from "./constants";

const initialState = {
  messageInfo: {
    message: "",
    variant: ""
  }
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SHOW_ALERT:
      return {
        ...state,
        messageInfo: {
          message: payload.message,
          variant: payload.variant
        }
      };
    default:
      return state;
  }
};
