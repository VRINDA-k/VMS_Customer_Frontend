import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import LocationOn from "@material-ui/icons/LocationOn";
import DateRange from "@material-ui/icons/DateRange";
import Email from "@material-ui/icons/Email";
import PhoneAndroid from "@material-ui/icons/PhoneAndroid";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import CurvedButton from "../../../components/buttons/curvedButton";
import { ADD_VISITOR } from "../../../config/appUrls";
import { css } from "aphrodite";
import { style, styles, getModalStyle } from "./styles";
import Modal from "@material-ui/core/Modal";

class ManageSingleVisitor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: null,
      isOpen: false,
      id: null
    };
  }
  componentDidMount() {
    let params = {
      company_division: this.props.companyDivision
    };
    this.props.listSingleVisitors(params);
  }
  componentDidUpdate(prevProps) {
    if (this.props.deleteSuccess) {
      this.setState({
        isOpen: false
      });
      let params = {
        company_division: this.props.companyDivision
      };
      this.props.listSingleVisitors(params);
    }
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };
  onDeleteHandler = id => {
    this.props.deleteVisitor(id);
  };
  onEditHandler = id => {
    this.props.retrieveVisitor(id);
    this.props.navigateTo(`${ADD_VISITOR}/${id}`);
  };

  handler = (id, name) => {
    this.props.onScheduleHandler(id, name, false);
  };

  handleDeleteModalClose = () => {
    this.setState({
      isOpen: false
    });
  };

  handleDeleteModalOpen = () => {
    this.setState({
      isOpen: true
    });
  };

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;
    return (
      <Grid className={css(style.root)}>
        {this.props.visitorData &&
          this.props.visitorData.map((item, i) => {
            return (
              <ExpansionPanel
                expanded={expanded === "panel" + i}
                onChange={this.handleChange("panel" + i)}
              >
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Avatar className={css(style.avatar)} src={item.image} />

                  <Typography className={classes.secondaryHeading}>
                    {item.first_name} {item.last_name}
                  </Typography>
                </ExpansionPanelSummary>
                <Typography className={css(style.textContentArea)}>
                  <Grid container spacing={24}>
                    <Grid item xs={12} md={6}>
                      <Grid xs={12} alignItems="center">
                        <Email color="primary" />
                        <span className={classes.iconTextStyle}>
                          {item.email}
                        </span>
                      </Grid>
                      <PhoneAndroid color="primary" />
                      <span className={classes.iconTextStyle}>
                        {item.mobile_number}
                      </span>
                      <Grid xs={12} item />
                    </Grid>
                    <Grid item xs={6}>
                      <Grid item xs={6}>
                        <LocationOn color="primary" />
                        <span className={classes.iconTextStyle}>
                          {item.address}
                        </span>
                      </Grid>

                      <Grid item xs={6}>
                        <DateRange color="primary" />
                        <span className={classes.iconTextStyle}>
                          {item.d_o_b}
                        </span>
                      </Grid>
                    </Grid>
                  </Grid>
                </Typography>
                <Divider />
                <Grid className={css(style.buttonArea)}>
                  <Button
                    color="secondary"
                    className={classes.button}
                    onClick={e => {
                      e.preventDefault();
                      this.setState({
                        id: item.id
                      });
                      this.handleDeleteModalOpen();
                    }}
                  >
                    DELETE
                  </Button>
                  <Grid style={{ float: "right" }}>
                    <Button
                      color="secondary"
                      onClick={() => this.onEditHandler(item.id)}
                    >
                      EDIT
                    </Button>
                    <Button
                      color="secondary"
                      onClick={() =>
                        this.handler(
                          item.id,
                          `${item.first_name} ${item.last_name}`
                        )
                      }
                    >
                      SCHEDULE
                    </Button>
                  </Grid>
                </Grid>
                <ExpansionPanelDetails />
              </ExpansionPanel>
            );
          })}
        <Modal open={this.state.isOpen} disableBackdropClick="true">
          <div style={getModalStyle()} className={classes.paper}>
            <Typography>Are you sure you want to delete this?</Typography>
            <Grid justify="flex-end" container>
              <Grid item xs={4}>
                <CurvedButton
                  value="Cancel"
                  variant="outlined"
                  color="secondary"
                  onClick={e => {
                    e.preventDefault();
                    this.handleDeleteModalClose();
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <CurvedButton
                  value="Yes"
                  variant="contained"
                  color="secondary"
                  onClick={e => {
                    e.preventDefault();
                    this.onDeleteHandler(this.state.id);
                  }}
                />
              </Grid>
            </Grid>
          </div>
        </Modal>
      </Grid>
    );
  }
}

ManageSingleVisitor.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ManageSingleVisitor);
