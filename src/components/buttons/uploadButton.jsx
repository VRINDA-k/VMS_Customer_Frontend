import React from "react";
import propTypes from "prop-types";
import { css } from "aphrodite/no-important";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Publish } from "@material-ui/icons";

const styles = theme => ({
  button: {
    width: "200px",
    height: "200px",
    margin: "0 auto",
    textTransform: "uppercase",
    // padding: "20px 30px",
    backgroundColor: "#ffffff"
    // marginLeft: "46%",
    // marginTop: " 28%"
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  },
  icon: {
    width: "66px",
    height: "150px"
  },
  input: {
    display: "none"
  }
});

const UploadButton = props => {
  const { classes, onChange, handleClickOpen } = props;
  return (
    <div>
      <form onSubmit={props.onFormSubmit}>
        <input
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          className={classes.input}
          id="flat-button-file"
          multiple
          type="file"
          onChange={e => onChange(e)}
        />
        <label htmlFor="flat-button-file">
          <Button
            component="span"
            type="submit"
            variant="fab"
            size="large"
            className={classes.button}
            onClick={e => handleClickOpen(e)}
          >
            <Publish className={classes.icon} color="secondary" />
          </Button>
        </label>
      </form>
    </div>
  );
};

UploadButton.propTypes = {
  classes: propTypes.object.isRequired,
  onChange: propTypes.func.isRequired,
  onFormSubmit: propTypes.func.isRequired
};

export default withStyles(styles)(UploadButton);
