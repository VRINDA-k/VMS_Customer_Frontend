import React, { Component, Fragment } from "react";
import { Row, Col } from "react-grid-system";
import { Table, withStyles, Grid } from "@material-ui/core";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import { push } from "connected-react-router";

import UploadButton from "../../../components/buttons/uploadButton";
import DownloadButton from "../../../components/buttons/downloadButton";
import SuccessButton from "../../../components/buttons/successButton";

import { showAlert } from "../../../components/snackbar/data/actions";

import { css } from "aphrodite";
import { styles } from "./styles";

import { addGroupVisitor } from "./data/actions";
import { setHeader } from "../../../components/appBar/data/actions";
import { excelUrl } from "../../../config/constants";
import { MANAGE_VISITOR } from "../../../config/appUrls";

class AddGroupVisitors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      open: false,
      groupName: "",
      error: ""
    };
  }
  componentDidMount() {
    this.props.setHeader({ header: "Add GroupVisitor" });
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.saveSuccess &&
      !this.props.error &&
      this.props.saveSuccess != prevProps.saveSuccess
    ) {
      let messageInfo = { message: this.props.message, variant: "success" };
      this.props.showAlert(messageInfo);
      this.props.navigateTo(MANAGE_VISITOR);
      this.setState({
        open: false
      });
    }
    if (this.props.error && this.props.error != prevProps.error) {
      let messageInfo = { message: this.props.error, variant: "error" };
      this.props.showAlert(messageInfo);
    }
  }

  Transition = props => {
    return <Slide direction="up" {...props} />;
  };

  onDownload = e => {
    e.preventDefault();
    window.open(excelUrl);
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({
      open: false,
      file: null
    });
  };
  uploadFile = () => {
    const formData = new FormData();
    formData.append("file", this.state.file);
    formData.append(
      "data",
      JSON.stringify({
        company_division_id: this.props.division,
        group_name: this.state.groupName
      })
    );

    this.props.addGroupVisitor(formData);
  };

  validateUploadedFileType() {
    const file = this.state.file;
  }
  onChange = event => {
    if (!event.target.files) {
      let change = {};
      change[event.target.name] = event.target.value;
      this.setState(change);
    } else {
      this.setState({ file: event.target.files[0] });
    }
  };
  render() {
    return (
      <Fragment>
        {/* <Table className={css(styles.TableStyle)}>
          <Row>
            <Col>
              <UploadButton
                onChange={e => this.onChange(e)}
                handleClickOpen={e => this.handleClickOpen(e)}
              />
              <Typography
                variant="h6"
                className={css(styles.uploadText)}
                color="secondary"
              >
                UPLOAD SHEET
              </Typography>
            </Col>
            <Col className={css(styles.ColStyle)}>
              <DownloadButton onClick={this.onDownload} />
              <Typography
                variant="h6"
                color="secondary"
                className={css(styles.downloadaText)}
              >
                DOWNLOAD TEMPLATE
              </Typography>
            </Col>
          </Row>
        </Table> */}

        <Grid
          direction="row"
          justify="space-around"
          alignContent="center"
          container
          alignItems="center"
          // style={{ width: "100%", height: "100%" }}
        >
          <Grid
            // container
            direction="column"
            justify="center"
            alignContent="center"
          >
            <UploadButton
              onChange={e => this.onChange(e)}
              handleClickOpen={e => this.handleClickOpen(e)}
            />
            <Typography
              variant="h6"
              className={css(styles.uploadText)}
              color="secondary"
            >
              UPLOAD SHEET
            </Typography>
          </Grid>

          <Grid
            // container
            direction="column"
            justify="center"
            alignContent="center"
          >
            <DownloadButton onClick={this.onDownload} />
            <Typography
              variant="h6"
              color="secondary"
              className={css(styles.downloadaText)}
            >
              DOWNLOAD TEMPLATE
            </Typography>
          </Grid>
        </Grid>

        {this.state.file != null && (
          <Dialog
            fullScreen
            open={this.state.open}
            onClose={this.handleClose}
            TransitionComponent={this.Transition}
          >
            <AppBar className={css(styles.appBar)}>
              <Toolbar>
                <IconButton
                  color="inherit"
                  onClick={this.handleClose}
                  aria-label="Close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography
                  variant="h6"
                  color="inherit"
                  className={css(styles.flex)}
                >
                  File Uploaded
                </Typography>
                <Button color="inherit" onClick={this.uploadFile}>
                  save
                </Button>
              </Toolbar>
            </AppBar>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              className={css(styles.successButton)}
            >
              <SuccessButton />
              <TextField
                id="standard-witeder"
                placeholder="*Enter Name"
                className={css(styles.textField)}
                onChange={this.onChange}
                name="groupName"
              />
            </Grid>
          </Dialog>
        )}
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoading: state.groupVisitor.isLoading,
    message: state.groupVisitor.message,
    saveSuccess: state.groupVisitor.saveSuccess,
    division: state.auth.info.company_division_id,
    companyName: state.auth.info.company,
    error: state.groupVisitor.error
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addGroupVisitor: data => dispatch(addGroupVisitor(data)),
    showAlert: messageInfo => dispatch(showAlert(messageInfo)),
    setHeader: data => dispatch(setHeader(data)),
    navigateTo: url => dispatch(push(url))
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AddGroupVisitors));
