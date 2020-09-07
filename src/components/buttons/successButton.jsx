import React from "react";
import PropTypes from "prop-types";
import { css } from "aphrodite/no-important";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Publish } from "@material-ui/icons";
import { Done } from "@material-ui/icons";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    width: "200px",
    height: "200px",
    margin: "0 auto",
    textTransform: "uppercase",
    padding: "20px 30px",
    backgroundColor: "#43a047",

    marginTop: " 28%"
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  },
  icon: {
    width: "66px",
    height: "150px",
    color: "#ffffff"
    // transform: "rotate(180deg)"
  }
});
// #ffffff
// #43a047

const SuccessButton = props => {
  const { classes } = props;
  return (
    <div>
      <Button variant="fab" size="large" className={classes.button}>
        <Done className={classes.icon} />
      </Button>
    </div>
  );
};

SuccessButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SuccessButton);
