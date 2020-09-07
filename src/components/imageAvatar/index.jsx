import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { styles } from "./styles";

const ImageAvatar = props => {
  const { classes, imageURL, style } = props;
  return (
    <Avatar
      style={style}
      alt="User image"
      src={imageURL}
      className={classNames(classes.bigAvatar)}
    />
  );
};

ImageAvatar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ImageAvatar);
