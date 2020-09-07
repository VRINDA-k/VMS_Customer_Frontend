import React from "react";
import propTypes from "prop-types";
import { css } from "aphrodite/no-important";
import inputStyles from "./styles";

const CurvedTextfield = props => {
  const {
    disabled,
    value,
    name,
    maxLength,
    type,
    placeholder,
    onChange
  } = props;
  return (
    <input
      disabled={disabled}
      value={value}
      name={name}
      maxLength={maxLength}
      className={css(inputStyles.curvedTextfield)}
      type={type}
      placeholder={placeholder}
      onChange={e => onChange(e)}
    />
  );
};

CurvedTextfield.propTypes = {
  disabled: propTypes.bool,
  value: propTypes.string,
  name: propTypes.string,
  maxLength: propTypes.number,
  className: propTypes.object,
  type: propTypes.string,
  placeholder: propTypes.string,
  onChange: propTypes.func.isRequired
};

CurvedTextfield.defaultProps = {
  disabled: false
};

export default CurvedTextfield;
