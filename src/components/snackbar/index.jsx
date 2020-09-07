import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";

import { SnackbarContentWrapper } from "./snackbarWrapper";

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2
  },
  margin: {
    margin: theme.spacing.unit
  }
});

class AlertSnackbar extends Component {
  queue = [];

  state = {
    open: false,
    messageInfo: {}
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.messageInfo.message &&
      prevProps.messageInfo !== this.props.messageInfo
    ) {
      this.setMessage(this.props.messageInfo);
    }
  }

  setMessage = ({ message, variant }) => {
    this.queue.push({
      message,
      variant,
      key: new Date().getTime()
    });
    if (this.state.open) {
      this.setState({ open: false });
    } else if (message) {
      this.processQueue();
    }
  };

  processQueue = () => {
    if (this.queue.length > 0) {
      this.setState({
        messageInfo: this.queue.shift(),
        open: true
      });
    }
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  handleExited = () => {
    this.processQueue();
  };

  render() {
    const { message, key, variant } = this.state.messageInfo;
    const { classes } = this.props;
    return (
      <Snackbar
        key={key}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={this.state.open}
        autoHideDuration={6000}
        onClose={this.handleClose}
        onExited={this.handleExited}
      >
        <SnackbarContentWrapper
          onClose={this.handleClose}
          className={classes.margin}
          variant={variant}
          message={message}
        />
      </Snackbar>
    );
  }
}

AlertSnackbar.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    messageInfo: state.snackbar.messageInfo
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

const styledSnackbar = withStyles(styles)(AlertSnackbar);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(styledSnackbar);
