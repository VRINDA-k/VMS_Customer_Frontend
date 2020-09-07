import { StyleSheet } from "aphrodite";

export const styles = StyleSheet.create({
  TableStyle: {
    marginTop: "10%"
  },
  ColStyle: {
    paddingLeft: "15%"
  },
  uploadText: {
    // paddingLeft: "52%",
    // marginTop: "2%"
    textAlign: "center"
  },
  downloadaText: {
    // marginTop: "2%"
    textAlign: "center"
  },
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  },
  successButton: {
    marginTop: "8%"
  },
  textField: { marginTop: "2%" }
});

export const style = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
    marginTop: "10%"
  }
});
