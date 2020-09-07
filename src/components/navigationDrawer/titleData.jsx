import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Home, GroupAdd, Input } from "@material-ui/icons";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import styles from "./styles";
import { css } from "aphrodite";

export const userDetails = userInfo => {
  return (
    <Grid container className={css(styles.userData)}>
      <Grid alignItems="flex-end">
        <Avatar className={css(styles.avatar)}>
          {userInfo.full_name.substring(0, 2).toUpperCase()}
        </Avatar>
        <Typography className={css(styles.nameText)}>
          {userInfo.email}
        </Typography>
      </Grid>
    </Grid>
  );
};

export const navigations = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <Home />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <GroupAdd />
      </ListItemIcon>
      <ListItemText primary="Visitors" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <Input />
      </ListItemIcon>
      <ListItemText primary="Log Out" />
    </ListItem>
  </div>
);
