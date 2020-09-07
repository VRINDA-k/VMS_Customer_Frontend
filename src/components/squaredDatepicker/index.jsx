import React, { Component } from "react";
import PropTypes from "prop-types";
import { css } from "aphrodite/no-important";
import inputStyles from "./styles";

class SquaredDatepicker extends Component {
  constructor(props) {
    super(props);
    this.state = { type: "text" };
  }
  render() {
    const {
      disabled,
      value,
      name,
      maxLength,
      placeholder,
      handleChange
    } = this.props;
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
        type={this.state.type}
        placeholder={placeholder}
        onChange={e => handleChange(e)}
        onFocus={e => {
          e.preventDefault();
          this.setState({ type: "date" });
        }}
        onBlur={e => {
          e.preventDefault();
          this.setState({ type: "text" });
        }}
      />
    );
  }
}

SquaredDatepicker.PropTypes = {
  disabled: PropTypes.bool,
  value: PropTypes.string,
  name: PropTypes.string,
  maxLength: PropTypes.number,
  className: PropTypes.object,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func
};

SquaredDatepicker.defaultProps = {
  disabled: false
};

export default SquaredDatepicker;
