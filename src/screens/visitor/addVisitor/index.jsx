import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import AddAPhoto from "@material-ui/icons/AddAPhoto";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import SquaredSelect from "../../../components/squaredSelect/";
import SquaredDatepicker from "../../../components/squaredDatepicker/";
import SquaredTextfield from "../../../components/textfields/squaredTextfield/";
import CurvedButton from "../../../components/buttons/curvedButton";
import ImageAvatar from "../../../components/imageAvatar/";
import {
  addVisitor,
  retrieveVisitor,
  updateVisitor,
  resetProps
} from "./data/actions";
import { setHeader } from "../../../components/appBar/data/actions";
import { showAlert } from "../../../components/snackbar/data/actions";
import { MANAGE_VISITOR } from "../../../config/appUrls";
import { styles } from "./styles";
class AddVisitor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonText: "Add",
      data: {
        companyDivisionID: "",
        firstname: "",
        lastname: "",
        dob: "",
        gender: "1",
        address: "",
        email: "",
        mobileNumber: "",
        choosen_file: "",
        choosen_file_name: ""
      }
    };
  }
  componentDidMount() {
    this.props.setHeader({ header: "Add Visitor" });
    this.setState({
      data: {
        ...this.state.data,
        companyDivisionID: this.props.companyDivisionID
      }
    });
    if (this.props.match.params.visitorID) {
      this.props.retrieveVisitor(this.props.match.params.visitorID);
    } else {
      this.props.resetProps();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.updateSuccess) {
      let messageInfo = { message: this.props.message, variant: "success" };
      this.props.showAlert(messageInfo);
      this.props.navigateTo(MANAGE_VISITOR);
    }
    if (
      this.props.retrieveVisitorData !== prevProps.retrieveVisitorData &&
      this.props.retrieveVisitorData
    ) {
      this.setState({
        buttonText: "Update",
        data: {
          firstname: this.props.retrieveVisitorData.first_name,
          lastname: this.props.retrieveVisitorData.last_name,
          address: this.props.retrieveVisitorData.address,
          dob: this.props.retrieveVisitorData.d_o_b,
          choosen_file: this.props.retrieveVisitorData.image,
          mobileNumber: this.props.retrieveVisitorData.mobile_number,
          gender: this.props.retrieveVisitorData.sex,
          email: this.props.retrieveVisitorData.email,
          companyDivisionID: this.props.companyDivisionID
        }
      });
    }
    if (
      this.props.saveVisitor &
      (this.props.saveVisitor !== prevProps.saveVisitor)
    ) {
      let messageInfo = {
        message: this.props.message,
        variant: "success"
      };
      this.props.showAlert(messageInfo);
      this.props.navigateTo(MANAGE_VISITOR);
    }
    if (
      this.props.error &&
      !this.props.saveVisitor &&
      this.props.error !== prevProps.error
    ) {
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

  handleClearAll = () => {
    this.setState({
      data: {
        ...this.state.data,
        firstname: "",
        lastname: "",
        dob: "",
        gender: "1",
        address: "",
        email: "",
        mobileNumber: "",
        choosen_file: ""
      }
    });
  };

  onFileLoad = e => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      this.setState({
        data: {
          ...this.state.data,
          choosen_file: file,
          choosen_file_name: file.name
        }
      });
    }
  };

  removeImage = () => {
    this.fileInput.value = "";
    this.setState({
      data: {
        ...this.state.data,
        choosen_file: undefined,
        choosen_file_name: ""
      }
    });
  };

  onSubmit = () => {
    const {
      data: {
        choosen_file,
        choosen_file_name,
        firstname,
        lastname,
        dob,
        gender,
        address,
        email,
        mobileNumber,
        companyDivisionID
      }
    } = this.state;

    if (this.validateImageField()) {
      const data = new FormData();
      const regex = new RegExp("^(image)");
      if (!regex.test(choosen_file.type) && this.props.match.params.visitorID) {
        data.append(
          "data",
          JSON.stringify({
            first_name: firstname,
            last_name: lastname,
            sex: gender,
            d_o_b: dob,
            address,
            email,
            mobile_number: mobileNumber,
            company_division_id: companyDivisionID,
            image: choosen_file
          })
        );
      }
      if (choosen_file && regex.test(choosen_file.type)) {
        data.append("image", choosen_file, choosen_file_name);
        data.append(
          "data",
          JSON.stringify({
            first_name: firstname,
            last_name: lastname,
            sex: gender,
            d_o_b: dob,
            address,
            email,
            mobile_number: mobileNumber,
            company_division_id: companyDivisionID
            // image: !choosen_file && image
          })
        );
      }

      if (this.props.match.params.visitorID) {
        this.props.updateVisitor(this.props.match.params.visitorID, data);
        this.handleClearAll();
      } else {
        this.props.addVisitor(data);
      }
    }
  };
  validateImageField() {
    const { choosen_file: file } = this.state.data;

    const regex = new RegExp("^(image)");
    if (!file) return true;
    if (this.props.retrieveVisitorData && this.props.retrieveVisitorData.image)
      return true;
    if (regex.test(file.type)) {
      if (file.size < 2097152) {
        // image should be grater than 2MB
        return true;
      } else {
        this.setState({
          errors: {
            ...this.state.errors,
            choosen_file_name: "Image should be less than 2MB"
          }
        });
        return false;
      }
    } else {
      this.setState({
        errors: {
          ...this.state.errors,
          choosen_file_name: "Invalid file type"
        }
      });
      return false;
    }
  }

  render() {
    const { classes } = this.props;
    const regex = new RegExp("^(image)");
    return (
      <div className={classes.toolbar}>
        <Paper className={classes.root} elevation={1}>
          <div className={classes.uploadGrid}>
            <input
              accept="image/*"
              className={classes.input}
              id="upload-image-fab"
              multiple
              type="file"
              onChange={this.onFileLoad}
              ref={fileInput => {
                this.fileInput = fileInput;
              }}
            />

            {this.state.data.choosen_file ||
            (this.props.retrieveVisitorData &&
              this.props.retrieveVisitorData.image) ? (
              <label htmlFor="upload-image-fab">
                <Button
                  component="span"
                  variant="fab"
                  color="secondary"
                  aria-label="upload"
                  className={classes.button}
                >
                  <ImageAvatar
                    imageURL={
                      this.props.retrieveVisitorData &&
                      this.props.retrieveVisitorData.image &&
                      !regex.test(this.state.data.choosen_file.type)
                        ? this.props.retrieveVisitorData.image
                        : URL.createObjectURL(this.state.data.choosen_file)
                    }
                  />
                </Button>
              </label>
            ) : (
              <label htmlFor="upload-image-fab">
                <Button
                  component="span"
                  variant="fab"
                  color="secondary"
                  aria-label="upload"
                  className={classes.button}
                >
                  <AddAPhoto className={classes.icon} />
                </Button>
              </label>
            )}
          </div>
          <Grid className={classes.gridStyle}>
            <SquaredTextfield
              disabled
              placeholder={`Company Name:${this.props.companyName}`}
            />
          </Grid>
          <Typography
            color="secondary"
            className={classes.gridStyle}
            variant="button"
          >
            PERSONAL INFORMATION
          </Typography>
          <Grid container>
            <Grid container>
              <Grid className={classes.gridStyle} item xs={6}>
                <SquaredTextfield
                  name="firstname"
                  type="text"
                  value={this.state.data.firstname}
                  placeholder="First Name"
                  maxLength={30}
                  handleChange={e => this.handleChange(e)}
                />
              </Grid>
              <Grid className={classes.gridStyle} item xs={6}>
                <SquaredTextfield
                  name="lastname"
                  type="text"
                  value={this.state.data.lastname}
                  placeholder="Last Name"
                  maxLength={30}
                  handleChange={e => this.handleChange(e)}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid className={classes.gridStyle} item xs={6}>
                <SquaredDatepicker
                  name="dob"
                  value={this.state.data.dob}
                  handleChange={e => this.handleChange(e)}
                  placeholder="DOB"
                />
              </Grid>
              <Grid className={classes.gridStyle} item xs={6}>
                <SquaredSelect
                  name="gender"
                  inputProps={{
                    name: "gender",
                    id: "visitor-gender"
                  }}
                  value={this.state.data.gender}
                  options={[
                    { value: "1", name: "Male" },
                    { value: "2", name: "Female" },
                    { value: "3", name: "Other" }
                  ]}
                  handleChange={e => this.handleChange(e)}
                />
              </Grid>
            </Grid>
            <Typography
              className={classes.gridStyle}
              color="secondary"
              variant="button"
            >
              CONTACT INFORMATION
            </Typography>
            <Grid container className={classes.gridStyle}>
              <SquaredTextfield
                name="address"
                type="text"
                value={this.state.data.address}
                placeholder="Address"
                maxLength={100}
                handleChange={e => this.handleChange(e)}
              />
            </Grid>
            <Grid container>
              <Grid className={classes.gridStyle} item xs={6}>
                <SquaredTextfield
                  name="email"
                  value={this.state.data.email}
                  maxLength={50}
                  handleChange={e => this.handleChange(e)}
                  type="email"
                  placeholder="Email"
                />
              </Grid>
              <Grid className={classes.gridStyle} item xs={6}>
                <SquaredTextfield
                  name="mobileNumber"
                  value={this.state.data.mobileNumber}
                  maxLength={13}
                  handleChange={e => this.handleChange(e)}
                  type="text"
                  placeholder="Mobile Number"
                />
              </Grid>
            </Grid>
            <Grid justify="flex-end" container>
              <Grid item xs={4}>
                <CurvedButton
                  value="Clear All"
                  variant="outlined"
                  color="secondary"
                  onClick={this.handleClearAll}
                />
              </Grid>

              <Grid item xs={4}>
                <CurvedButton
                  value={this.state.buttonText}
                  variant="contained"
                  color="secondary"
                  onClick={this.onSubmit}
                />
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}
AddVisitor.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    isLoading: state.addEditVisitor.isLoading,
    message: state.addEditVisitor.message,
    saveVisitor: state.addEditVisitor.saveVisitor,
    companyDivisionID: state.auth.info.company_division_id,
    companyName: state.auth.info.company,
    retrieveVisitorData: state.addEditVisitor.retrieveVisitorData,
    updateSuccess: state.addEditVisitor.updateSuccess,
    error: state.addEditVisitor.error
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addVisitor: data => dispatch(addVisitor(data)),
    setHeader: data => dispatch(setHeader(data)),
    retrieveVisitor: id => dispatch(retrieveVisitor(id)),
    updateVisitor: (id, data) => dispatch(updateVisitor(id, data)),
    navigateTo: url => dispatch(push(url)),
    showAlert: messageInfo => dispatch(showAlert(messageInfo)),
    navigateTo: url => dispatch(push(url)),
    resetProps: () => dispatch(resetProps())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AddVisitor));
