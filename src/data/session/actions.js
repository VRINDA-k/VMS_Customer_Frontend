import requestHandler from "../../services/api/requestHandler.js";

import { LOGIN_URL } from "../../config/apiUrls.js";

import {
  AUTH_UPDATE_TOKEN,
  AUTH_DISCARD_TOKEN,
  SUBMIT_LOGIN,
  RESET_LOGIN,
  SET_INFO,
} from "./constants";

export function authUpdateToken(token = "", tokenExpiry = "") {
  return {
    type: AUTH_UPDATE_TOKEN,
    token,
    tokenExpiry,
  };
}

export function logout() {
  return {
    type: AUTH_DISCARD_TOKEN,
  };
}

export function submitLogin(data) {
  return requestHandler(SUBMIT_LOGIN, LOGIN_URL, "POST", { data });
}

export function resetLogin() {
  return {
    type: RESET_LOGIN,
  };
}

export const setInfo = data => ({
  type: SET_INFO,
  promise: Promise.resolve(data),
});
