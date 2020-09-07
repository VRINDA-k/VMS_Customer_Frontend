import { StyleSheet } from "aphrodite";

export const style = StyleSheet.create({
  root: {
    width: "100%"
    // marginTop: "5%"
  },

  avatar: {
    backgroundColor: "moccasin",
    marginRight: "3%"
  },

  grid: {
    alignItems: "flex-end"
  },
  textContentArea: {
    marginLeft: "5%",
    marginBottom: "3%"
  },
  buttonArea: {
    marginBottom: "-3%"
  },
  card: {
    minWidth: 275
  },
  title: {
    fontSize: 14
  }
});

export const styles = theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    position: "relative",
    top: 10
  },
  button: {
    margin: theme.spacing.unit
  },
  iconTextStyle: { position: "relative", bottom: 7, left: 10 },
  table: {
    minWidth: 700
  },
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  actionHeader: {
    textAlign: "right"
  },
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 80,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[10],
    padding: theme.spacing.unit * 4
  }
});

export function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}
