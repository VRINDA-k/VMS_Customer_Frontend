import { StyleSheet } from "aphrodite";

// const styles = StyleSheet.create({
//   appSection: {
//     height: "100%",
//     backgroundColor: "#eaeaea",
//     // padding: "75px 200px 25px",
//     justify: "center"
//   }
// });

const styles = theme => ({
  appSection: {
    height: "100vh",
    // width: "100vw",
    backgroundColor: "#eaeaea",
    // padding: "75px 200px 25px",
    // justify: "center",
    padding: `${theme.spacing.unit * 1}%`,
    // marginTop: "7.5%"
    paddingTop: "10%"
  }
});

export default styles;
