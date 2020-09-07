import { handle } from "redux-pack";

import { Action } from "rxjs/internal/scheduler/Action";

import {
  LIST_PENDING_VISITOR,
  REJECT_PENDING_VISITOR,
  APPROVE_PENDING_VISITOR
} from "./constants";

const initialState = {
  isLoading: false,
  error: null,
  message: "",
  visitorsData: [],
  rejectSuccess: false,
  approveSuccess: false
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LIST_PENDING_VISITOR:
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
            visitorsData: payload.data.results
          };
        }
      });
    case REJECT_PENDING_VISITOR:
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
            rejectSuccess: true
          };
        }
      });
    case APPROVE_PENDING_VISITOR:
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
            approveSuccess: true
          };
        }
      });
    default:
      return state;
  }
};
