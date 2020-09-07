import {
  SCHEDULE_VISITOR,
  RETRIEVE_VISITOR,
  SCHEDULE_GROUP_VISITOR
} from "./constants";
import requestHandler from "../../../../services/api/requestHandler";
import { SCHEDULE_VISITOR_API } from "../../../../config/apiUrls.js";

import {
  VISITOR_API,
  SCHEDULE_GROUP_VISITOR_API
} from "../../../../config/apiUrls.js";

export function scheduleVisitor(data) {
  return requestHandler(SCHEDULE_VISITOR, SCHEDULE_VISITOR_API, "POST", {
    data
  });
}

export function retrieveVisitor(id) {
  return requestHandler(RETRIEVE_VISITOR, `${VISITOR_API}${id}/`, "GET", {});
}

export function scheduleGroupVisitor(data) {
  return requestHandler(
    SCHEDULE_GROUP_VISITOR,
    SCHEDULE_GROUP_VISITOR_API,
    "POST",
    {
      data
    }
  );
}
