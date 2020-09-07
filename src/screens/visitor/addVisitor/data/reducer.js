import { handle } from "redux-pack";

import {
  ADD_VISITOR,
  RETRIEVE_VISITOR,
  UPDATE_VISITOR,
  RESET_VISITOR
} from "./constants";

const initialState = {
  isLoading: false,
  error: null,
  message: "",
  saveVisitor: false,
  retrieveVisitorData: "",
  updateSuccess: false
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_VISITOR:
      return handle(state, action, {
        start: prevState => {
          return {
            isLoading: true,
            error: null,
            retrieveVisitorData: ""
          };
        },
        finish: prevState => ({ ...prevState, isLoading: false }),
        failure: prevState => ({
          error:
            payload.response !== undefined
              ? payload.response.data.error[0]
              : "Something went wrong. Please try after some time",
          saveVisitor: false
        }),
        success: prevState => {
          return {
            message: payload.data.message,
            saveVisitor: true,
            retrieveVisitorData: ""
          };
        }
      });
    case RETRIEVE_VISITOR:
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
              : "Something went wrong. Please try after some time"
        }),
        success: prevState => {
          return {
            message: payload.data.message,
            retrieveVisitorData: payload.data
          };
        }
      });
    case UPDATE_VISITOR:
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
          updateSuccess: false
        }),
        success: prevState => {
          return {
            message: payload.data.message,
            updateSuccess: true,
            retrieveVisitorData: ""
          };
        }
      });

    case RESET_VISITOR:
      return { ...initialState };

    default:
      return state;
  }
};
