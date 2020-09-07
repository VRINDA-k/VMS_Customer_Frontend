import React, { Component } from "react";
import { connect } from "react-redux";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { withStyles } from "@material-ui/core/styles";

import { changeTab } from "./data/actions";

import { styles } from "./styles";

class AppbarTabs extends Component {
  constructor(props) {
    super(props);
    this.state = { value: 0 };
  }
  handleChange = (event, value) => {
    this.setState({ value });
    this.props.changeTab({ value });
  };
  render() {
    const { classes } = this.props;
    return this.props.tabs.length !== 0 ? (
      <Tabs
        value={this.state.value}
        onChange={this.handleChange}
        indicatorColor="secondary"
        textColor="secondary"
        centered
        fullWidth
      >
        {this.props.tabs.map((tab, i) => (
          <Tab key={i} className={classes.tabStyle} label={tab} />
        ))}
      </Tabs>
    ) : (
      ""
    );
  }
}

function mapStateToProps(state) {
  return {
    tabs: state.tabs.tabs
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeTab: data => dispatch(changeTab(data))
  };
}

const styledTabs = withStyles(styles)(AppbarTabs);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(styledTabs);
