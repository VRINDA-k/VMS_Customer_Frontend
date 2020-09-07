import { get as getSession } from "../../services/storage";
import { handle } from "redux-pack";

import {
  set as setSession,
  removeStore as removeSession
} from "../../services/storage";

import {
  AUTH_UPDATE_TOKEN,
  AUTH_DISCARD_TOKEN,
  SUBMIT_LOGIN,
  RESET_LOGIN,
  SET_INFO
} from "./constants";

const nonLoggedInState = {
  isLoading: false,
  isLoggedIn: false,
  token: "",
  tokenExpiry: "",
  loginError: "",
  info: {},
  error: null
};

const { exist, token, tokenExpiry, info } = getSession();
const defaultState = exist
  ? {
      ...nonLoggedInState,
      isLoggedIn: exist,
      token,
      tokenExpiry,
      info
    }
  : nonLoggedInState;

export default (state = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SUBMIT_LOGIN:
      return handle(state, action, {
        start: prevState => {
          removeSession();
          return {
            ...nonLoggedInState,
            isLoading: true,
            error: null
          };
        },
        finish: prevState => ({ ...prevState, isLoading: false }),
        failure: prevState => ({
          ...nonLoggedInState,
          loginError:
            payload.response !== undefined
              ? payload.response.data.error[0]
              : "Something went wrong. Please try after some time",
          isLoggedIn: false
        }),
        success: prevState => {
          const { token, token_expiry, info } = payload.data;

          setSession(token, token_expiry, info);
          return {
            ...defaultState,
            isLoggedIn: true,
            token,
            tokenExpiry: token_expiry,
            info
          };
        }
      });

    case AUTH_UPDATE_TOKEN:
      return {
        ...state,
        token: action.token,
        tokenExpiry: action.tokenExpiry
      };

    case AUTH_DISCARD_TOKEN:
      removeSession();
      return {
        ...nonLoggedInState
      };

    case RESET_LOGIN:
      return nonLoggedInState;

    case SET_INFO: {
      if (payload && payload.token) {
        setSession(payload.token, payload.token_expiry);
        return {
          ...state,
          info: payload.info,
          isLoggedIn: true
        };
      }
      return state;
    }
    default:
      return state;
  }
};
