import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { withStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";

import AppbarTabs from "../appbarTabs/";
import StatusAppbarTabs from "../statusBarTabs";
import { styles } from "./styles";

class SimpleAppBar extends Component {
  constructor(props) {
    super(props);
    this.state = { value: 0 };
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Open drawer"
              onClick={() => this.props.openSideDrawer()}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              className={classes.title}
              variant="h6"
              color="inherit"
              noWrap
            >
              {this.props.header}
            </Typography>
            <div className={classes.grow} />
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
              />
            </div>
          </Toolbar>
          <AppbarTabs />
          <StatusAppbarTabs />
        </AppBar>
      </div>
    );
  }
}

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  openSideDrawer: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    header: state.appbar.header
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

const styledAppBar = withStyles(styles)(SimpleAppBar);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(styledAppBar);
