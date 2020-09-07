import React, { Component } from "react";
import { connect } from "react-redux";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { withStyles } from "@material-ui/core/styles";

import { changeStatusTab } from "./data/actions";

import { styles } from "./styles";

class StatusAppbarTabs extends Component {
  constructor(props) {
    super(props);
    this.state = { value: 0 };
  }
  handleChange = (event, value) => {
    this.setState({ value });
    this.props.changeStatusTab({ value });
  };
  render() {
    const { classes } = this.props;
    return this.props.statusTabs.length !== 0 ? (
      <Tabs
        value={this.state.value}
        onChange={this.handleChange}
        indicatorColor="secondary"
        textColor="secondary"
        centered
        fullWidth
      >
        {this.props.statusTabs.map((tab, i) => (
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
    statusTabs: state.statustab.statusTabs
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeStatusTab: data => dispatch(changeStatusTab(data))
  };
}

const styleTabs = withStyles(styles)(StatusAppbarTabs);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(styleTabs);
