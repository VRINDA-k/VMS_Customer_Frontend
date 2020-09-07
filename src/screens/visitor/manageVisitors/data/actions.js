import requestHandler from "../../../../services/api/requestHandler";

import { VISITOR_API, VISITOR_GROUP_API } from "../../../../config/apiUrls.js";

import {
  LIST_VISITOR,
  DELETE_VISITOR,
  RETRIEVE_VISITOR,
  RETRIEVE_GROUP_VISITOR,
  DELETE_GROUP_VISITOR
} from "./constants";

export function listSingleVisitors(params) {
  return requestHandler(LIST_VISITOR, VISITOR_API, "GET", { params });
}
export function deleteVisitor(id) {
  return requestHandler(DELETE_VISITOR, `${VISITOR_API}${id}/`, "DELETE", {});
}
export function retrieveVisitor(id) {
  return requestHandler(RETRIEVE_VISITOR, `${VISITOR_API}${id}/`, "GET", {});
}
export function retrieveGroupVisitor(params) {
  return requestHandler(RETRIEVE_GROUP_VISITOR, VISITOR_GROUP_API, "GET", {
    params
  });
}
export function deleteGroupVisitor(id) {
  return requestHandler(
    DELETE_GROUP_VISITOR,
    `${VISITOR_GROUP_API}${id}/`,
    "DELETE",
    {}
  );
}
