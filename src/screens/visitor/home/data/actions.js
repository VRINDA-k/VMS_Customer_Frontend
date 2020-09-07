import requestHandler from "../../../../services/api/requestHandler";

import { VISITOR_LISTING_API } from "../../../../config/apiUrls";

import {
  LIST_PENDING_VISITOR,
  REJECT_PENDING_VISITOR,
  APPROVE_PENDING_VISITOR
} from "./constants";

export function listPendingVisitors(params) {
  return requestHandler(LIST_PENDING_VISITOR, VISITOR_LISTING_API, "GET", {
    params
  });
}
export function rejectPendingVisitor(data) {
  return requestHandler(REJECT_PENDING_VISITOR, VISITOR_LISTING_API, "POST", {
    data
  });
}
export function approvePendingVisitor(data) {
  return requestHandler(APPROVE_PENDING_VISITOR, VISITOR_LISTING_API, "POST", {
    data
  });
}
