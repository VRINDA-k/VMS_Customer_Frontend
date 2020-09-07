import { handle } from "redux-pack";

import { ADD_GROUP_VISITOR } from "./constants";

const initialState = {
  isLoading: false,
  error: null,
  message: "",
  saveSuccess: false
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_GROUP_VISITOR:
      return handle(state, action, {
        start: prevState => {
          return {
            isLoading: true,
            error: null
          };
        },
        finish: prevState => ({ ...prevState, isLoading: false }),
        failure: prevState => ({
          error:
            payload.response !== undefined
              ? payload.response.data.error[0]
              : "Something went wrong. Please try after some time",
          saveSuccess: false
        }),
        success: prevState => {
          return {
            message: payload.data.message,
            saveSuccess: true
          };
        }
      });

    default:
      return state;
  }
};
