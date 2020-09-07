import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import CurvedButton from "../../../components/buttons/curvedButton";
import SquaredSelect from "../../../components/squaredSelect/";
import SquaredTextfield from "../../../components/textfields/squaredTextfield/";
import Paper from "@material-ui/core/Paper";
import DateTimePicker from "../../../components/DateTimePicker/";
import { fetchSettingsParams } from "../../../data/staticApi/settingsParams/actions";
import { connect } from "react-redux";
import {
  scheduleVisitor,
  retrieveVisitor,
  scheduleGroupVisitor
} from "./data/actions";
import moment from "moment";
import { styles, getModalStyle } from "./styles";
class SchedulevisitorModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      visitorName: "",
      data: {
        visitor: "",
        visitorCategory: "",
        idProofType: "",
        vehicleType: "",
        validFrom: "",
        validTo: "",
        vehicleNumber: "",
        idProofNumber: "",
        purpose: ""
      }
    };
  }

  componentDidMount() {
    this.props.fetchSettingsParams();
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.visitorName &&
      this.props.visitorName !== prevProps.visitorName
    ) {
      this.setState({
        visitorName: this.props.visitorName,
        data: { visitor: this.props.visitorID }
      });
    }
    if (
      this.props.scheduleSuccess &&
      this.props.scheduleSuccess !== prevProps.scheduleSuccess
    ) {
      let messageInfo = {
        message: this.props.schedulemessage,
        variant: "success"
      };
      this.props.showAlert(messageInfo);
      this.props.handleModalClose();
      this.resetState();
    }
    if (this.props.error && this.props.error !== prevProps.error) {
      let messageInfo = {
        message: this.props.error,
        variant: "error"
      };
      this.props.showAlert(messageInfo);
    }
  }

  handleChange = event => {
    this.setState({
      data: {
        ...this.state.data,
        [event.target.name]: event.target.value
      }
    });
  };

  handleSubmit = () => {
    const data = {
      visitor: this.state.data.visitor,
      visitor_category: this.state.data.visitorCategory
        ? this.state.data.visitorCategory
        : this.props.data.visitor_category[0].key,
      id_proof: this.state.data.idProofType
        ? this.state.data.idProofType
        : this.props.data.id_proof_type[0].key,
      id_proof_number: this.state.data.idProofNumber,
      valid_from: moment(this.state.data.validFrom).format(
        "YYYY-MM-DD HH:mm:ss"
      ),
      valid_to: moment(this.state.data.validTo).format("YYYY-MM-DD HH:mm:ss"),
      vehicle_type: this.state.data.vehicleType
        ? this.state.data.vehicleType
        : this.props.data.vehicle_type[0].key,
      vehicle_number: this.state.data.vehicleNumber,
      purpose: this.state.data.purpose,
      user_type: this.props.userType,
      company_division: this.props.companyDivisionId
    };
    if (this.props.isGroup) {
      let data = {
        valid_from: moment(this.state.data.validFrom).format(
          "YYYY-MM-DD HH:mm:ss"
        ),
        valid_to: moment(this.state.data.validTo).format("YYYY-MM-DD HH:mm:ss"),
        purpose: this.state.data.purpose,
        group: this.props.visitorID
      };
      this.props.scheduleGroupVisitor(data);
    } else {
      this.props.scheduleVisitor(data);
    }
  };

  resetState = () => {
    this.setState({
      data: {
        visitor: "",
        visitorCategory: "",
        idProofType: "",
        vehicleType: "",
        validFrom: "",
        validTo: "",
        vehicleNumber: "",
        idProofNumber: "",
        purpose: ""
      }
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Modal open={this.props.isOpen} disableBackdropClick="true">
          <div style={getModalStyle()} className={classes.paper}>
            <Typography
              color="secondary"
              variant="h6"
              id="modal-title"
              style={{ marginLeft: 8 }}
            >
              Schedule visit for {this.state.visitorName}
            </Typography>
            {!this.props.isGroup && (
              <Grid container>
                <Grid style={{ paddingRight: 5 }} item xs={6}>
                  {this.props.data.visitor_category && (
                    <SquaredSelect
                      name="visitorCategory"
                      inputProps={{
                        name: "visitorCategory",
                        id: "visitor-category"
                      }}
                      value={this.state.data.visitor_category}
                      options={this.props.data.visitor_category.map(
                        visitorCategory => {
                          return {
                            value: visitorCategory.key,
                            name: visitorCategory.value
                          };
                        }
                      )}
                      handleChange={e => this.handleChange(e)}
                    />
                  )}
                </Grid>

                <Grid style={{ paddingLeft: 5 }} item xs={6}>
                  <SquaredTextfield
                    name="vehicleNumber"
                    type="text"
                    value={this.state.data.vehicleNumber}
                    placeholder="Vehicle Number (if present)"
                    maxLength={30}
                    handleChange={e => this.handleChange(e)}
                  />
                </Grid>
              </Grid>
            )}
            <Typography
              color="secondary"
              variant="button"
              style={{ marginLeft: 8 }}
            >
              VALID FROM
            </Typography>
            <Grid container>
              <Grid style={{ width: "100%" }}>
                <DateTimePicker
                  name="validFrom"
                  value={this.state.data.validFrom}
                  handleChange={e => this.handleChange(e)}
                />
              </Grid>
            </Grid>
            <Typography
              color="secondary"
              variant="button"
              style={{ marginLeft: 8 }}
            >
              VALID TO
            </Typography>
            <Grid container>
              <Grid style={{ width: "100%" }}>
                <DateTimePicker
                  name="validTo"
                  value={this.state.data.validTo}
                  handleChange={e => this.handleChange(e)}
                />
              </Grid>
            </Grid>

            {!this.props.isGroup && (
              <Grid container>
                <Grid style={{ paddingRight: 5 }} item xs={6}>
                  {this.props.data.id_proof_type && (
                    <SquaredSelect
                      name="idProofType"
                      inputProps={{
                        name: "idProofType",
                        id: "ID-proof-type"
                      }}
                      value={this.state.data.id_proof_type}
                      handleChange={e => this.handleChange(e)}
                      options={this.props.data.id_proof_type.map(
                        idProofType => {
                          return {
                            value: idProofType.key,
                            name: idProofType.value
                          };
                        }
                      )}
                    />
                  )}
                </Grid>
                <Grid style={{ paddingLeft: 5 }} item xs={6}>
                  <SquaredTextfield
                    name="idProofNumber"
                    type="text"
                    value={this.state.data.idProofNumber}
                    maxLength={20}
                    handleChange={e => this.handleChange(e)}
                    placeholder="ID Proof Number"
                  />
                </Grid>
              </Grid>
            )}

            <Grid container>
              {!this.props.isGroup && (
                <Grid style={{ paddingRight: 5 }} item xs={6}>
                  {this.props.data.vehicle_type && (
                    <SquaredSelect
                      name=" vehicleType"
                      inputProps={{
                        name: "vehicleType",
                        id: "vehicle-type"
                      }}
                      value={this.state.data.vehicle_type}
                      options={this.props.data.vehicle_type.map(vehicleType => {
                        return {
                          value: vehicleType.key,
                          name: vehicleType.value
                        };
                      })}
                      handleChange={e => this.handleChange(e)}
                    />
                  )}
                </Grid>
              )}

              <Grid style={{ paddingLeft: 5 }} item xs={6}>
                <SquaredTextfield
                  name="purpose"
                  type="text"
                  value={this.state.data.purpose}
                  placeholder="Purpose of Visit"
                  maxLength={30}
                  handleChange={e => this.handleChange(e)}
                />
              </Grid>
            </Grid>
            <Grid justify="flex-end" container>
              <Grid item xs={4}>
                <CurvedButton
                  value="cancel"
                  variant="outlined"
                  color="secondary"
                  onClick={() => {
                    this.props.handleModalClose();
                    this.resetState();
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <CurvedButton
                  value="submit"
                  variant="contained"
                  color="secondary"
                  onClick={e => {
                    e.preventDefault();
                    this.handleSubmit();
                  }}
                />
              </Grid>
            </Grid>
          </div>
        </Modal>
      </div>
    );
  }
}

SchedulevisitorModal.propTypes = {
  classes: PropTypes.object.isRequired
};
const SimpleModalWrapped = withStyles(styles)(SchedulevisitorModal);
function mapStateToProps(state) {
  return {
    data: state.settingsParams.data,
    userType: state.auth.info.user_type,
    companyDivisionId: state.auth.info.company_division_id,
    isLoading: state.scheduleVisitor.isLoading,
    message: state.scheduleVisitor.message,
    saveSucces: state.scheduleVisitor.saveSucces,
    error: state.scheduleVisitor.error,
    scheduleSuccess: state.scheduleVisitor.scheduleSuccess,
    schedulemessage: state.scheduleVisitor.schedulemessage
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchSettingsParams: () => dispatch(fetchSettingsParams()),
    scheduleVisitor: data => dispatch(scheduleVisitor(data)),
    retrieveVisitor: id => dispatch(retrieveVisitor(id)),
    scheduleGroupVisitor: data => dispatch(scheduleGroupVisitor(data))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SimpleModalWrapped);
