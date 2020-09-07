import { handle } from "redux-pack";

import {
  LIST_VISITOR,
  DELETE_VISITOR,
  RETRIEVE_VISITOR,
  RETRIEVE_GROUP_VISITOR,
  DELETE_GROUP_VISITOR
} from "./constants";

const initialState = {
  isLoading: false,
  error: null,
  message: "",
  saveSuccess: false,
  visitorData: [],
  deleteSuccess: false,
  retrieveVisitorData: "",
  groupVisitorData: []
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LIST_VISITOR:
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
            visitorData: payload.data.results
          };
        }
      });
    case DELETE_VISITOR:
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
          deleteSuccess: false
        }),
        success: prevState => {
          return {
            message: payload.data.message,
            // visitorData: payload.data.results
            deleteSuccess: true
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
    case RETRIEVE_GROUP_VISITOR:
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
            groupVisitorData: payload.data.results
          };
        }
      });
    case DELETE_GROUP_VISITOR:
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
          deleteSuccess: false
        }),
        success: prevState => {
          return {
            message: payload.data.message,
            // visitorData: payload.data.results
            deleteSuccess: true
          };
        }
      });

    default:
      return state;
  }
};
