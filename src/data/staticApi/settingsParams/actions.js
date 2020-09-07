import requestHandler from "../../../services/api/requestHandler";
import { FETCH_SETTINGS_PARAMS } from "./constants";
import { SETTINGS_PARAMS_API } from "../../../config/apiUrls";

export function fetchSettingsParams() {
  return requestHandler(FETCH_SETTINGS_PARAMS, SETTINGS_PARAMS_API, "GET", {});
}
