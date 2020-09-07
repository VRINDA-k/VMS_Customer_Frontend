import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import PersonAdd from "@material-ui/icons/PersonAdd";
import GroupAdd from "@material-ui/icons/GroupAdd";
import AssignmentInd from "@material-ui/icons/AssignmentInd";
import Tooltip from "@material-ui/core/Tooltip";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import { ADD_VISITOR, ADD_VISITOR_GROUP } from "../../config/appUrls";
import { styles } from "./styles";

class CollapsibleFab extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  onMasterfabClick = e => {
    this.setState({ open: !this.state.open });
  };

  onChildfabClick = (e, action) => {
    e.preventDefault();
    switch (action) {
      case "ADD_VISITOR": {
        this.props.navigateTo(ADD_VISITOR);
        break;
      }
      case "ADD_GROUP_VISITOR": {
        this.props.navigateTo(ADD_VISITOR_GROUP);
        break;
      }
      case "MANAGE_VISITOR": {
        this.props.navigateTo("/visitor/manage");
        break;
      }
      default:
        return true;
    }
  };
  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <Grid alignItems="center" container>
        <Grid item xs={12}>
          <Tooltip title="Schedule,Edit or Delete Visitor" placement="left">
            <Button
              variant="fab"
              color="secondary"
              aria-label="Add"
              onClick={event => this.onChildfabClick(event, "MANAGE_VISITOR")}
              mini
              className={!open ? classes.action1Closed : classes.button}
            >
              <AssignmentInd />
            </Button>
          </Tooltip>
        </Grid>
        <Grid item xs={12}>
          <Tooltip title="Add Group Visitors" placement="left">
            <Button
              variant="fab"
              color="secondary"
              aria-label="Add"
              onClick={event =>
                this.onChildfabClick(event, "ADD_GROUP_VISITOR")
              }
              mini
              className={!open ? classes.action2Closed : classes.button}
            >
              <GroupAdd />
            </Button>
          </Tooltip>
        </Grid>
        <Grid item xs={12}>
          <Tooltip title="Add a Visitor" placement="left">
            <Button
              variant="fab"
              color="secondary"
              aria-label="Add"
              onClick={event => this.onChildfabClick(event, "ADD_VISITOR")}
              mini
              className={!open ? classes.action1Closed : classes.button}
            >
              <PersonAdd />
            </Button>
          </Tooltip>
        </Grid>
        <Grid item xs={12}>
          <Tooltip
            title={open ? "Close Visitor actions" : "Show Visitor actions"}
            placement="left"
          >
            <Button
              variant="fab"
              color="primary"
              aria-label="Add"
              className={classes.button}
              onClick={this.onMasterfabClick}
            >
              <AddIcon
                className={open ? classes.addIconOpen : classes.addIconClose}
              />
            </Button>
          </Tooltip>
        </Grid>
      </Grid>
    );
  }
}

CollapsibleFab.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    navigateTo: url => dispatch(push(url))
  };
}

const StyledFabs = withStyles(styles)(CollapsibleFab);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StyledFabs);
