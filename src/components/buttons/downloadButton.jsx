import React from "react";
import PropTypes from "prop-types";
import { css } from "aphrodite/no-important";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Publish } from "@material-ui/icons";

const styles = theme => ({
  button: {
    // margin: theme.spacing.unit,
    width: "200px",
    height: "200px",
    // margin: "0 auto",
    textTransform: "uppercase",
    // padding: "20px 30px",
    backgroundColor: "#ffffff"
    // marginTop: " 28%"
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  },
  icon: {
    width: "66px",
    height: "150px",
    transform: "rotate(180deg)"
  }
});

const DownloadButton = props => {
  const { classes, onClick } = props;
  return (
    <div>
      <Button
        onClick={onClick}
        variant="fab"
        size="large"
        className={classes.button}
      >
        <Publish className={classes.icon} color="secondary" />
      </Button>
    </div>
  );
};

DownloadButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DownloadButton);
