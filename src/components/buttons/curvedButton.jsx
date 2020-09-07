import React from "react";
import propTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const muiButtonStyle = theme => ({
  button: {
    width: "80%",
    textTransform: "none",
    borderRadius: 18,
    padding: 7,
    margin: 25
  }
});

const CurvedButton = props => {
  const { type, value, variant, color, disabled, classes, onClick } = props;
  return (
    <Button
      type={type}
      variant={variant}
      color={color}
      disabled={disabled}
      className={classes.button}
      onClick={onClick}
    >
      {value}
    </Button>
  );
};
CurvedButton.propTypes = {
  type: propTypes.string,
  value: propTypes.string.isRequired,
  variant: propTypes.string,
  color: propTypes.string,
  disabled: propTypes.bool,
  classes: propTypes.object.isRequired
};

CurvedButton.defaultProps = {
  disabled: false
};

export default withStyles(muiButtonStyle)(CurvedButton);
