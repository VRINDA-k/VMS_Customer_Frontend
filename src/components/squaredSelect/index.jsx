import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { NativeSelect } from "@material-ui/core";

import styles from "./styles";

const SquaredSelect = ({
  name,
  classes,
  value,
  handleChange,
  options,
  inputProps
}) => {
  return (
    <NativeSelect
      className={classes.selectStyle}
      value={value}
      onChange={e => handleChange(e)}
      inputProps={inputProps}
      color="secondary"
    >
      <option disabled>{name}</option>
      {options.map((option, i) => {
        return (
          <option key={i} value={option.value}>
            {option.name}
          </option>
        );
      })}
    </NativeSelect>
  );
};

export default withStyles(styles)(SquaredSelect);
