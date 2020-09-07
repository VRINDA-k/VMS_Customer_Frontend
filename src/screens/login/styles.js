import { StyleSheet } from "aphrodite";

import LoginBgWeb from "../../assets/images/loginBg-web.png";

const styles = StyleSheet.create({
  leftColStyle: {
    background: `url(${LoginBgWeb}) no-repeat`,
    color: "#fff"
  },
  rightColStyle: {
    textAlign: "center",
    paddingTop: "8%",
    paddingRight: 135,
    paddingLeft: 135
  },
  poweredByStyle: {
    display: "block",
    color: "rgb(144, 136, 136)",
    marginTop: 100
  },
  formStyle: {
    marginTop: 75
  },
  containerStyle: { padding: 0, height: "100%" },
  rowStyle: { margin: 0, height: "100%" },
  featuresStyle: { textAlign: "center", marginTop: "40%" },
  listStyle: { listStyle: "none", margin: 0, padding: 0 },
  liStyle: { marginBottom: 20 },
  featureIconStyle: { marginInlineEnd: 30 },
  brandLogoStyle: { width: 225 },
  poweredByLogoStyle: { width: 50 }
});

export default styles;
