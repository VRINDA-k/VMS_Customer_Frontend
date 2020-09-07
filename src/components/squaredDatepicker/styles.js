import { StyleSheet } from "aphrodite/no-important";

const inputStyles = StyleSheet.create({
  squaredTextfield: {
    border: "1px solid rgb(218, 218, 218)",
    width: "-webkit-fill-available",
    // width: "-moz-available",
    padding: 8,
    fontSize: "smaller",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: "auto",
    marginRight: "auto",
    outline: "none",
    display: "block"
  },
  disabled: {
    backgroundColor: "rgb(218, 218, 218)"
  }
});

export default inputStyles;
