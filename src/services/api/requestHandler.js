import API from "./index";
import { get as getSession } from "../../services/storage";

const requestHandler = (type, url, method, { data, params }) => {
  const { exist: tokenExist } = getSession();
  const token = tokenExist;
  return {
    type,
    promise: API.request({
      url,
      method,
      data,
      params,
      token,
    }),
  };
};

export default requestHandler;
