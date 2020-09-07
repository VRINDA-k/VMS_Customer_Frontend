import React from "react";
import PropTypes from "prop-types";
import { css } from "aphrodite/no-important";
import inputStyles from "./styles";

const SquaredTextfield = props => {
  const {
    disabled,
    value,
    name,
    maxLength,
    type,
    placeholder,
    handleChange
  } = props;
  return (
    <input
      disabled={disabled}
      value={value}
      name={name}
      maxLength={maxLength}
      className={css(
        inputStyles.squaredTextfield,
        disabled && inputStyles.disabled
      )}
      type={type}
      placeholder={placeholder}
      onChange={e => handleChange(e)}
    />
  );
};

SquaredTextfield.PropTypes = {
  disabled: PropTypes.bool,
  value: PropTypes.string,
  name: PropTypes.string,
  maxLength: PropTypes.number,
  className: PropTypes.object,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func
};

SquaredTextfield.defaultProps = {
  disabled: false
};

export default SquaredTextfield;
