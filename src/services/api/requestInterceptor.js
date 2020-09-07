import { get as getSession } from "../storage";

export function onRequest(config) {
  const customConfig = config;
  const { exist: tokenExist, token } = getSession();
  if (tokenExist && !customConfig.headers.Authorization) {
    customConfig.headers.Authorization = `Token ${token}`;
  } else if (config.token && !tokenExist) {
    window.location = "/login";
  }
  return config;
}

export function onRequestError(error) {
  return Promise.reject(error);
}
