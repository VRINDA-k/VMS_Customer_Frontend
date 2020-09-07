import requestHandler from "../../../../services/api/requestHandler";

import { ADD_VISITOR_GROUP_API } from "../../../../config/apiUrls.js";

import { ADD_GROUP_VISITOR } from "./constants";

export function addGroupVisitor(data) {
  return requestHandler(ADD_GROUP_VISITOR, ADD_VISITOR_GROUP_API, "POST", {
    data
  });
}
