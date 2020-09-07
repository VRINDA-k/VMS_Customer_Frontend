import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { push } from "connected-react-router";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import _ from "lodash";

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import { Home, GroupAdd, Input } from "@material-ui/icons";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import { HOME_URL, VISITOR_HOME } from "../../config/appUrls";
import { userDetails } from "./titleData";
import { logout } from "../../data/session/actions";

const styles = {
  list: {
    width: 275
  },
  fullList: {
    width: "auto"
  }
};

class NavigationDrawer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }
  componentDidUpdate(prevProps) {
    if (this.props.isSideDrawerOpen !== prevProps.isSideDrawerOpen) {
      this.setState({ open: this.props.isSideDrawerOpen });
    }
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
    open ? this.props.openSideDrawer() : this.props.closeSideDrawer();
  };

  getIcon = index => {
    switch (index) {
      case 0:
        return <Home />;
      case 1:
        return <GroupAdd />;
      case 2:
        return <Input />;
      default:
        return "";
    }
  };

  onNavClick = (index, event) => {
    const { navigateTo, logout } = this.props;
    event.preventDefault();
    switch (index) {
      case 0: {
        navigateTo(HOME_URL);
        break;
      }

      case 1: {
        navigateTo(VISITOR_HOME);
        break;
      }
      case 2: {
        logout();
        break;
      }
      default:
        return "";
    }
  };

  render() {
    const { classes, userInfo } = this.props;
    const sideList = (
      <div className={classes.list}>
        <List>{!_.isEmpty(userInfo) && userDetails(userInfo)}</List>
        <List>
          {["Home", "Visitor Management", "Logout"].map((text, index) => (
            <ListItem
              onClick={e => this.onNavClick(index, e)}
              button
              key={text}
            >
              <ListItemIcon>{this.getIcon(index)}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );
    return (
      <div>
        <Drawer
          open={this.state.open}
          onClose={this.toggleDrawer("open", false)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer("open", false)}
            onKeyDown={this.toggleDrawer("open", false)}
          >
            {sideList}
          </div>
        </Drawer>{" "}
      </div>
    );
  }
}

NavigationDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    userInfo: state.auth.info
  };
}

function mapDispatchToProps(dispatch) {
  return {
    navigateTo: url => dispatch(push(url)),
    logout: () => dispatch(logout())
  };
}

const styledNavigationDrawer = withStyles(styles, { withTheme: true })(
  NavigationDrawer
);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(styledNavigationDrawer);
