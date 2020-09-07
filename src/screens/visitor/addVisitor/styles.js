export const styles = theme => ({
  toolbar: {
    ...theme.mixins.toolbar
  },
  root: {
    ...theme.mixins.gutters()
    // margin: "100px 150px 0px"
    // paddingTop: theme.spacing.unit * 2,
    // paddingBottom: theme.spacing.unit * 2
  },
  gridStyle: {
    paddingRight: 5,
    paddingLeft: 5
  },
  button: {
    width: 100,
    height: 100,
    boxShadow: "0 0px 0px 0px"
  },
  icon: {
    width: 50,
    height: 50
  },
  input: {
    display: "none"
  },
  uploadGrid: {
    position: "relative",
    top: -45
  }
});
