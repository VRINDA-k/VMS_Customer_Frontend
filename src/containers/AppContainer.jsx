import React, { Component } from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import store, { history } from "../store/";
import { MuiThemeProvider } from "@material-ui/core/styles";

import AppRoutes from "./AppRoutes";
import theme from "./muiTheme";
import AlertSnackbar from "../components/snackbar";

class AppContainer extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <MuiThemeProvider theme={theme}>
            <AppRoutes />
            <AlertSnackbar />
          </MuiThemeProvider>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default AppContainer;
