import { handle } from "redux-pack";

import {
  SCHEDULE_VISITOR,
  RETRIEVE_VISITOR,
  SCHEDULE_GROUP_VISITOR
} from "./constants";

const initialState = {
  isLoading: false,
  error: null,
  schedulemessage: "",
  scheduleSuccess: false,
  retrieveVisitorData: ""
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SCHEDULE_VISITOR:
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
          scheduleSuccess: false
        }),
        success: prevState => {
          return {
            schedulemessage: payload.data.message,
            scheduleSuccess: true
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
    case SCHEDULE_GROUP_VISITOR:
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
          scheduleSuccess: false
        }),
        success: prevState => {
          return {
            schedulemessage: payload.data.message,
            scheduleSuccess: true
          };
        }
      });
    default:
      return state;
  }
};
