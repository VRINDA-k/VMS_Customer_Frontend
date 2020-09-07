import { StyleSheet } from "aphrodite";

export const style = StyleSheet.create({
  fabStyle: {
    position: "fixed",
    right: 20,
    bottom: 20
  }
});
export const styles = theme => ({
  root: {
    width: "100%"
    // marginTop: "3%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15)
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    paddingLeft: "2%",
    width: "100%"
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20
  },
  details: {
    alignItems: "center"
  },
  column: {
    flexBasis: "33.33%"
  },
  column1: {
    flexBasis: "11.33%"
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  },
  avatar: {
    margin: 10,
    backgroundColor: "moccasin"
  },
  bigAvatar: {
    width: 60,
    height: 60
  },
  dateAlign: {
    marginTop: "1%",
    marginBottom: "1%",
    marginLeft: "2%"
  }
});
