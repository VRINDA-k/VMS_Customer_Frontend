import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import {
  setStatusTabs,
  resetStatusTabs
} from "../../../components/statusBarTabs/data/actions";

import { styles } from "./styles";

class ApprovedVisitors extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    let tabs = ["Yet", "Arrived", "Checked-In", "Left"];
    this.props.setStatusTabs({ tabs });
  }
  componentWillUnmount() {
    this.props.resetStatusTabs();
  }
  render() {
    return (
      <div>
        <h1>test</h1>
      </div>
    );
  }
}
let approvedVisitors = withStyles(styles)(ApprovedVisitors);

function mapStateToProps(state) {
  return {
    message: state.visitors.message,
    error: state.visitors.error
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setStatusTabs: tabs => dispatch(setStatusTabs(tabs)),
    resetStatusTabs: () => dispatch(resetStatusTabs())
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(approvedVisitors);
