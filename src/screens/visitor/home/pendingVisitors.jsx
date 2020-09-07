import React, { Component } from "react";
import { connect } from "react-redux";

import { Grid, WithStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import Checkbox from "@material-ui/core/Checkbox";

import { showAlert } from "../../../components/snackbar/data/actions";

import { styles } from "./styles";

import {
  listPendingVisitors,
  rejectPendingVisitor,
  approvePendingVisitor
} from "./data/actions";

// import { HomeIcon, SteeringIcon } from "../../../components/Icons/svgIcons";

class PendingVistors extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let params = {
      visiting_status: 2,
      company_division: this.props.division
    };
    this.props.listPendingVisitors(params);
  }

  componentDidUpdate(prevProps) {
    if (
      (this.props.rejectSuccess &&
        this.props.rejectSuccess !== prevProps.rejectSuccess) ||
      (this.props.approveSuccess &&
        this.props.approveSuccess !== prevProps.approveSuccess)
    ) {
      let params = {
        visiting_status: 2,
        company_division: this.props.division
      };
      this.props.listPendingVisitors(params);
      let messageInfo = { message: this.props.message, variant: "success" };
      this.props.showAlert(messageInfo);
    }
    if (this.props.error && this.props.error !== prevProps.error) {
      let messageInfo = { message: this.props.error, variant: "error" };
      this.props.showAlert(messageInfo);
    }
  }

  onRejectHandler = id => {
    let data = {
      company_division: this.props.division,
      visiting_status: "3",
      schedule: [{ id: id }]
    };
    console.log(data);
    this.props.rejectPendingVisitor(data);
  };

  onApproveHandler = id => {
    let data = {
      company_division: this.props.division,
      visiting_status: "1",
      schedule: [{ id: id }]
    };
    console.log(data);
    this.props.approvePendingVisitor(data);
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid className={classes.root}>
        {this.props.visitorsData &&
          this.props.visitorsData.map((item, i) => {
            return (
              <Grid>
                <Grid container direction="row">
                  {/* <Checkbox color="primary" />  needs in future */}
                  <Typography className={classes.dateAlign} color="secondary">
                    {item.group_date}
                  </Typography>
                </Grid>
                <Grid>
                  {item.data.map((visitor, i) => {
                    return (
                      <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                          <Avatar
                            src={visitor.image}
                            className={classNames(classes.avatar)}
                          />
                          <Grid container direction="row" alignItems="center">
                            <Typography className={classes.secondaryHeading}>
                              {visitor.first_name} {visitor.last_name}
                              <br />
                              {visitor.valid_from.substring(0, 10)}
                            </Typography>
                          </Grid>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className={classes.details}>
                          <div className={classes.column1}>
                            <Typography>
                              ID Proof
                              <br />
                              Id Proof Number
                              <br />
                              Vehicle
                              <br />
                              Vehicle Number
                            </Typography>
                          </div>
                          <div className={classes.column}>
                            <Typography>
                              :{`  ${visitor.id_proof}`}
                              <br />:{`  ${visitor.id_proof_number}`}
                              <br />:{`  ${visitor.vehicle_type}`}
                              <br />:{`  ${visitor.vehicle_number}`}
                            </Typography>
                          </div>
                          <div
                            className={classNames(
                              classes.column1,
                              classes.helper
                            )}
                          >
                            <Typography>
                              Purpose
                              <br />
                              Address
                              <br />
                              Email
                              <br />
                              Mobile Number
                            </Typography>
                          </div>
                          <div className={classes.column}>
                            <Typography>
                              :{`  ${visitor.purpose}`}
                              <br />:{`  ${visitor.address}`}
                              <br />:{`  ${visitor.email}`}
                              <br />:{`  ${visitor.mobile_number}`}
                              <br />
                            </Typography>
                          </div>
                        </ExpansionPanelDetails>

                        <Grid
                          container
                          direction="row"
                          justify="flex-end"
                          alignItems="flex-end"
                        >
                          <Button
                            onClick={() => this.onRejectHandler(visitor.id)}
                          >
                            REJECT
                          </Button>
                          <Button
                            color="primary"
                            onClick={() => this.onApproveHandler(visitor.id)}
                          >
                            APPROVE
                          </Button>
                        </Grid>
                      </ExpansionPanel>
                    );
                  })}
                </Grid>
              </Grid>
            );
          })}
      </Grid>
    );
  }
}

PendingVistors.propTypes = {
  classes: PropTypes.object.isRequired
};

let pendingVisitors = withStyles(styles)(PendingVistors);

function mapStateToProps(state) {
  return {
    division: state.auth.info.company_division_id,
    visitorsData: state.visitors.visitorsData,
    rejectSuccess: state.visitors.rejectSuccess,
    approveSuccess: state.visitors.approveSuccess,
    message: state.visitors.message,
    error: state.visitors.error
  };
}

function mapDispatchToProps(dispatch) {
  return {
    listPendingVisitors: params => dispatch(listPendingVisitors(params)),
    rejectPendingVisitor: data => dispatch(rejectPendingVisitor(data)),
    approvePendingVisitor: data => dispatch(approvePendingVisitor(data)),
    showAlert: messageInfo => dispatch(showAlert(messageInfo))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(pendingVisitors);
