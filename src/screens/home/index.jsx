import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { css } from "aphrodite";
import Grid from "@material-ui/core/Grid";

import { LOGIN_URL } from "../../config/appUrls";
import SimpleAppBar from "../../components/appBar/";
import NavigationDrawer from "../../components/navigationDrawer/";

import { openSideDrawer, closeSideDrawer } from "./data/actions";
import { showAlert } from "../../components/snackbar/data/actions";
import styles from "./styles";

import { withStyles } from "@material-ui/core/styles";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let messageInfo = {
      message: "Welcome back !",
      variant: "success"
    };

    this.props.showAlert(messageInfo);
    if (!this.props.isLoggedIn) {
      this.props.navigateTo(LOGIN_URL);
    }
  }

  componentDidUpdate() {
    if (!this.props.isLoggedIn) {
      this.props.navigateTo(LOGIN_URL);
      let messageInfo = {
        message: "Successfully logged out !",
        variant: "success"
      };

      this.props.showAlert(messageInfo);
    }
  }

  render() {
    const {
      openSideDrawer,
      isSideDrawerOpen,
      closeSideDrawer,
      children,
      classes
    } = this.props;
    return (
      <Fragment>
        <Grid direction="column">
          <SimpleAppBar openSideDrawer={() => openSideDrawer()} />
          <Grid className={classes.appSection}>{children}</Grid>
        </Grid>

        <NavigationDrawer
          isSideDrawerOpen={isSideDrawerOpen}
          openSideDrawer={() => openSideDrawer()}
          closeSideDrawer={() => closeSideDrawer()}
        />
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoading: state.Home.isLoading,
    isSideDrawerOpen: state.Home.isSideDrawerOpen,
    isLoggedIn: state.auth.isLoggedIn
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openSideDrawer: () => dispatch(openSideDrawer()),
    closeSideDrawer: () => dispatch(closeSideDrawer()),
    navigateTo: url => dispatch(push(url)),
    showAlert: messageInfo => dispatch(showAlert(messageInfo))
  };
}

let home = withStyles(styles)(Home);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(home);
