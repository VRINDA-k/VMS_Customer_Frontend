import axios from "axios";

import { BASE_URL as baseURL } from "../../config/baseUrl";

import { onRequest, onRequestError } from "./requestInterceptor";
import { onResponse, onResponseError } from "./responseInterceptor";

const API = axios.create({
  baseURL,
  timeout: 30000,
  retry: 1,
  retryDelay: 1000,
});

API.interceptors.request.use(onRequest, onRequestError);
API.interceptors.response.use(onResponse, onResponseError);

export default API;
