import { combineReducers } from "redux";
import auth from "../data/session/reducer";
import visitors from "../screens/visitor/home/data/reducer";
import Home from "../screens/home/data/reducer";
import addEditVisitor from "../screens/visitor/addVisitor/data/reducer";
import tabs from "../components/appbarTabs/data/reducer";
import statustab from "../components/statusBarTabs/data/reducer";
import appbar from "../components/appBar/data/reducer";
import snackbar from "../components/snackbar/data/reducer";
import settingsParams from "../data/staticApi/settingsParams/reducer";
import groupVisitor from "../screens/visitor/addGroupVistors/data/reducer";
import scheduleVisitor from "../screens/visitor/schedulevisitorModal/data/reducer";
import manageVisitor from "../screens/visitor/manageVisitors/data/reducer";

export default combineReducers({
  auth,
  tabs,
  statustab,
  appbar,
  snackbar,
  Home,
  visitors,
  manageVisitor,
  settingsParams,
  groupVisitor,
  scheduleVisitor,
  addEditVisitor
});
