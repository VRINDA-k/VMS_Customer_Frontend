import { handle } from "redux-pack";

import { FETCH_SETTINGS_PARAMS } from "./constants";

const initialState = {
  isLoading: false,
  error: null,
  data: []
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_SETTINGS_PARAMS:
      return handle(state, action, {
        start: prevState => ({ ...prevState, isLoading: true, error: null }),
        finish: prevState => ({ ...prevState, isLoading: false }),
        failure: prevState => ({
          ...prevState,
          error:
            payload.response !== undefined ? payload.response.data.error[0] : ""
        }),
        success: prevState => ({
          ...prevState,
          data: payload.data
        })
      });
    default:
      return state;
  }
};
