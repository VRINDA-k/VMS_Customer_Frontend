import { debounce } from "lodash";
import moment from "moment";

import { REFRESH_TOKEN_API } from "../config/apiUrls";
import API from "./api/";
import { updateSession, setActiveTime, get as getSession } from "./storage";
import { authUpdateToken, logout } from "../data/session/actions";

export default function tokenRefresher({ dispatch }) {
  const hasToken = token => token && token.toString().length > 0;

  const isTokenExpiring = () => {
    const { token, tokenExpiry } = getSession();

    if (hasToken(token)) {
      const expiry = moment(tokenExpiry);
      const beforeExpiry = expiry.subtract(3, "minute");
      const now = moment();
      return now.isAfter(beforeExpiry);
    }

    return false;
  };

  const tokenExpiryTime = 3.6e6;

  const process = () => {
    const { token, lastActivity } = getSession();
    const currentDifference = moment(new Date()).diff(moment(lastActivity));
    if (currentDifference > tokenExpiryTime) {
      dispatch(logout());
    } else if (isTokenExpiring()) {
      API.request({
        method: "post",
        url: REFRESH_TOKEN_API,
        data: {
          token,
        },
      }).then(({ data }) => {
        const { token, token_expiry } = data;

        updateSession(token, token_expiry);
        dispatch(authUpdateToken(token, token_expiry));
      });
    }
  };

  const updateEvent = () => {
    const { token } = getSession();
    if (hasToken(token)) {
      setActiveTime();
    }
  };

  const debounced = debounce(updateEvent, 60000);

  window.addEventListener("click", debounced, false);
  setInterval(process, 60000);
  debounced();
}
