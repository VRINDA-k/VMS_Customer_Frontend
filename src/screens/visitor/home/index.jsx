import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { css } from "aphrodite";

import CollapsibleFab from "../../../components/collapsibleFab/";
import { styles, style } from "./styles";
import {
  setTabs,
  resetTabs
} from "../../../components/appbarTabs/data/actions";
import { setHeader } from "../../../components/appBar/data/actions";

import { scheduleVisitors } from "../../../mockData";

import PendingVistors from "./pendingVisitors";
import ApprovedVisitors from "./approvedVisitors";
import { Grid } from "@material-ui/core";

class VisitorHome extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.setHeader({ header: "Home" });
    let tabs = ["Pending", "Approved", "Alerets"];
    this.props.setTabs({ tabs });
  }

  componentWillUnmount() {
    this.props.resetTabs();
  }
  render() {
    return (
      <Fragment>
        <Grid>
          {this.props.currentTab === 0 && (
            <PendingVistors
              scheduleVisitors={scheduleVisitors}
              visitorsData={this.props.visitorsData}
            />
          )}
          {this.props.currentTab === 1 && (
            <ApprovedVisitors setTabs={this.props.setTabs} />
          )}
        </Grid>

        <span className={css(style.fabStyle)}>
          <CollapsibleFab />
        </span>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    // isLoading: state.visitorHome.isLoading
    currentTab: state.tabs.activeTab,
    visitorsData: state.visitors.visitorsData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setTabs: tabs => dispatch(setTabs(tabs)),
    resetTabs: () => dispatch(resetTabs()),
    setHeader: data => dispatch(setHeader(data))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VisitorHome);
