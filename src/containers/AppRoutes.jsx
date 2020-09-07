import React from "react";
import { Route, Switch } from "react-router";

import Login from "../screens/login/";
import Home from "../screens/home/";
import VisitorHome from "../screens/visitor/home/";
import AddGroupVisitors from "../screens/visitor/addGroupVistors";
import AddVisitor from "../screens/visitor/addVisitor/";
import manageVisitores from "../screens/visitor/manageVisitors";

import {
  LOGIN_URL,
  HOME_URL,
  VISITOR_HOME,
  ADD_VISITOR,
  ADD_VISITOR_GROUP,
  MANAGE_VISITOR
} from "../config/appUrls";

const AppRoutes = () => (
  <Switch>
    <Route path={LOGIN_URL} component={Login} />
    <Home>
      <Switch>
        <Route path={VISITOR_HOME} component={VisitorHome} />
        <Route path={`${ADD_VISITOR}/:visitorID`} component={AddVisitor} />
        <Route path={ADD_VISITOR} component={AddVisitor} />
        <Route exact path={ADD_VISITOR_GROUP} component={AddGroupVisitors} />
        <Route exact path={MANAGE_VISITOR} component={manageVisitores} />
      </Switch>
    </Home>
    <Route path={HOME_URL} component={Home} />
    <Route exact path="/" component={Login} />
  </Switch>
);

export default AppRoutes;
