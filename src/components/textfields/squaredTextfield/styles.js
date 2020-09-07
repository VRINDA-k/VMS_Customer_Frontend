import { StyleSheet } from "aphrodite/no-important";

const inputStyles = StyleSheet.create({
  squaredTextfield: {
    border: "1px solid #e4e5e6",
    width: "-webkit-fill-available",
    padding: 8,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: "auto",
    marginRight: "auto",
    outline: "none",
    display: "block"
  },
  disabled: {
    backgroundColor: "#e4e5e6"
  }
});

export default inputStyles;
