import moment from "moment";
import randomHash from "./randomHash";
import _ from "lodash";

/**
 * Rather that just keeping data in one single key 'VMS_CUSTOMER'
 * we are going to spread the data over a set of random hashes.
 * Ultimately the data on the localStorage will look like this
 *
 * 'VMS_CUSTOMER': 'RANDOM_USER_HASH'
 * 'RANDOM_USER_HASH': ['RANDOM_TOKEN_HASH', 'RANDOM_INFO_HASH']
 * 'RANDOM_TOKEN_HASH': 'token string'
 * 'RANDOM_INFO_HASH': 'info data stringified'
 *
 * This will make manual data access from localStorage hard
 *
 * A RANDOM_HASH will actually look something like this: DWA$%deadaw#1223Wadwad#$#==-!!22
 *
 * @todo: encryp token, info, string.
 */

const user = "VMS_CUSTOMER";

const getHash = () => {
  const userHash = localStorage.getItem(user) || "";
  const userHashAry = JSON.parse(localStorage.getItem(userHash)) || [];

  return {
    userHash,
    tokenHash: userHashAry[0] || "",
    expiryHash: userHashAry[1] || "",
    infoHash: userHashAry[2] || "",
    lastActiveTime: userHashAry[3] || ""
  };
};

const hasToken = token => token.toString().length > 0;

const checkExpired = (token, tokenExpiry) => {
  const exist = hasToken(token);
  const now = moment();
  const expiry = exist ? moment(tokenExpiry) : moment().subtract(1, "minute");

  return now.isAfter(expiry);
};

export function removeStore() {
  const {
    userHash,
    tokenHash,
    expiryHash,
    infoHash,
    lastActiveTime
  } = getHash();
  localStorage.removeItem(user);
  localStorage.removeItem(userHash);
  localStorage.removeItem(tokenHash);
  localStorage.removeItem(expiryHash);
  localStorage.removeItem(infoHash);
  localStorage.removeItem(lastActiveTime);
}

// @TODO: setup refesh token
export function set(token = "", tokenExpiry = "", info = {}) {
  const userHash = randomHash();
  const tokenHash = randomHash();
  const expiryHash = randomHash();
  const infoHash = randomHash();
  const lastActiveTime = randomHash();
  removeStore();
  localStorage.setItem(user, userHash);
  localStorage.setItem(
    userHash,
    JSON.stringify([tokenHash, expiryHash, infoHash, lastActiveTime])
  );
  localStorage.setItem(tokenHash, token);
  localStorage.setItem(expiryHash, tokenExpiry);
  localStorage.setItem(infoHash, JSON.stringify(info));
  localStorage.setItem(lastActiveTime, new Date());

  return true;
}

export function setActiveTime() {
  const { lastActiveTime } = getHash();
  localStorage.setItem(lastActiveTime, new Date());
}

export function updateSession(token = "", tokenExpiry = "") {
  const { tokenHash, expiryHash } = getHash();

  localStorage.setItem(tokenHash, token);
  localStorage.setItem(expiryHash, tokenExpiry);

  return true;
}

export function get() {
  const { tokenHash, expiryHash, infoHash, lastActiveTime } = getHash();
  const token = localStorage.getItem(tokenHash) || "";
  const tokenExpiry = localStorage.getItem(expiryHash) || "";
  const info = JSON.parse(localStorage.getItem(infoHash) || "{}");
  const lastActivity = localStorage.getItem(lastActiveTime) || "";
  const hasExpired = checkExpired(token, tokenExpiry);
  const loginStatus = _.isEmpty(info) ? false : true;

  if (hasExpired) {
    removeStore();

    return {
      exist: false,
      token: "",
      tokenExpiry: "",
      loginStatus,
      info: {},
      lastActivity: ""
    };
  }

  return {
    exist: true,
    token,
    loginStatus,
    tokenExpiry,
    info,
    lastActivity
  };
}
