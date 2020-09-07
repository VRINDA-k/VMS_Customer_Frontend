import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { showAlert } from "../../../components/snackbar/data/actions";
import {
  setTabs,
  resetTabs
} from "../../../components/appbarTabs/data/actions";
import {
  listSingleVisitors,
  deleteVisitor,
  retrieveVisitor,
  retrieveGroupVisitor,
  deleteGroupVisitor
} from "./data/actions";
import ManageSingleVisitor from "./mangeSingleVisitors";
import { setHeader } from "../../../components/appBar/data/actions";
import ManageGroupVisitor from "./manageGroupVisitors";
import SchedulevisitorModal from "../schedulevisitorModal";

class manageVisitors extends Component {
  state = {
    value: 0,
    expanded: null,
    showModal: false,
    visitorID: "",
    visitorName: "",
    isGroup: false
  };
  componentDidMount() {
    this.props.setHeader({ header: "Manage Visitor" });
    let tabs = ["Manage Visitor", "Manage Group Visitor"];
    this.props.setTabs({ tabs });
  }
  componentWillUnmount() {
    this.props.resetTabs();
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.deleteSuccess &&
      this.props.deleteSuccess !== prevProps.deleteSuccess
    ) {
      let messageInfo = { message: this.props.message, variant: "success" };
      this.props.showAlert(messageInfo);
    }
    if (
      this.props.currentTab === 0 &&
      this.props.currentTab != prevProps.currentTab
    ) {
      let params = {
        company_division: this.props.companyDivision
      };
      this.props.listSingleVisitors(params);
    }
  }
  onScheduleHandler = (id, name, isGroup) => {
    this.setState({
      showModal: true,
      visitorID: id,
      visitorName: name,
      isGroup: isGroup
    });
  };

  handleModalClose = () => {
    this.setState({
      showModal: false
    });
  };

  render() {
    return (
      <Fragment>
        {this.props.currentTab === 0 && (
          <ManageSingleVisitor
            visitorData={this.props.visitorData}
            deleteVisitor={this.props.deleteVisitor}
            retrieveVisitor={this.props.retrieveVisitor}
            navigateTo={this.props.navigateTo}
            scheduleSuccess={this.props.scheduleSuccess}
            showAlert={this.props.showAlert}
            message={this.props.message}
            companyDivision={this.props.companyDivision}
            listSingleVisitors={this.props.listSingleVisitors}
            onScheduleHandler={this.onScheduleHandler}
            handleModalClose={this.handleModalClose}
            handleModalOpen={this.handleModalOpen}
            deleteSuccess={this.props.deleteSuccess}
          />
        )}
        {this.props.currentTab == 1 && (
          <ManageGroupVisitor
            retrieveGroupVisitor={this.props.retrieveGroupVisitor}
            companyDivision={this.props.companyDivision}
            groupVisitorData={this.props.groupVisitorData}
            deleteGroupVisitor={this.props.deleteGroupVisitor}
            handleModalClose={this.handleModalClose}
            handleModalOpen={this.handleModalOpen}
            deleteSuccess={this.props.deleteSuccess}
            onScheduleHandler={this.onScheduleHandler}
          />
        )}

        <SchedulevisitorModal
          isOpen={this.state.showModal}
          handleModalClose={this.handleModalClose}
          visitorID={this.state.visitorID}
          visitorName={this.state.visitorName}
          showAlert={this.props.showAlert}
          navigateTo={this.props.navigateTo}
          isGroup={this.state.isGroup}
        />
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentTab: state.tabs.activeTab,
    visitorData: state.manageVisitor.visitorData,
    deleteSuccess: state.manageVisitor.deleteSuccess,
    companyDivision: state.auth.info.company_division_id,
    scheduleSuccess: state.scheduleVisitor.scheduleSuccess,
    schedulemessage: state.scheduleVisitor.schedulemessage,
    message: state.manageVisitor.message,
    groupVisitorData: state.manageVisitor.groupVisitorData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setTabs: tabs => dispatch(setTabs(tabs)),
    resetTabs: () => dispatch(resetTabs()),
    listSingleVisitors: params => dispatch(listSingleVisitors(params)),
    deleteVisitor: id => dispatch(deleteVisitor(id)),
    retrieveVisitor: id => dispatch(retrieveVisitor(id)),
    navigateTo: url => dispatch(push(url)),
    setHeader: data => dispatch(setHeader(data)),
    retrieveGroupVisitor: params => dispatch(retrieveGroupVisitor(params)),
    navigateTo: url => dispatch(push(url)),
    showAlert: messageInfo => dispatch(showAlert(messageInfo)),
    deleteGroupVisitor: id => dispatch(deleteGroupVisitor(id))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(manageVisitors);
