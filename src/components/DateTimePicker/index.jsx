import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    border: "1px solid rgb(218, 218, 218)",
    width: "-webkit-fill-available",
    padding: 8,
    fontSize: "smaller",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: "auto",
    marginRight: "auto",
    outline: "none",
    display: "block"
  }
});

const DateTimePicker = props => {
  const { classes, handleChange, value, name } = props;

  return (
    <input
      value={value}
      name={name}
      onChange={e => handleChange(e)}
      type="datetime-local"
      className={classes.textField}
      InputLabelProps={{
        shrink: false
      }}
    />
  );
};

DateTimePicker.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  handleChange: PropTypes.func
};

export default withStyles(styles)(DateTimePicker);
