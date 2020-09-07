import { OPEN_SIDEDRAWER, CLOSE_SIDEDRAWER } from "./constants";

export function openSideDrawer() {
  return {
    type: OPEN_SIDEDRAWER
  };
}

export function closeSideDrawer() {
  return {
    type: CLOSE_SIDEDRAWER
  };
}
