import requestHandler from "../../../../services/api/requestHandler";

import { VISITOR_API } from "../../../../config/apiUrls.js";

import {
  ADD_VISITOR,
  RETRIEVE_VISITOR,
  UPDATE_VISITOR,
  RESET_VISITOR
} from "./constants";

export function addVisitor(data) {
  return requestHandler(ADD_VISITOR, VISITOR_API, "POST", { data });
}
export function retrieveVisitor(id) {
  return requestHandler(RETRIEVE_VISITOR, `${VISITOR_API}${id}/`, "GET", {});
}
export function updateVisitor(id, data) {
  return requestHandler(UPDATE_VISITOR, `${VISITOR_API}${id}/`, "PUT", {
    data
  });
}
export function resetProps() {
  return { type: RESET_VISITOR };
}
