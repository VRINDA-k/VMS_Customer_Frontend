import { StyleSheet } from "aphrodite";

import Logo from "../../assets/images/loginBg-mobile.png";

const styles = StyleSheet.create({
  img: {
    height: "100px",
    borderRadius: "0px 0px 15px 0px"
  },
  userData: {
    background: `url(${Logo}) no-repeat`,
    height: "179px",
    borderRadius: "0px 0px 15px 0px",
    marginTop: "-4%",
    alignItems: "flex-end",
    paddingLeft: "7%"
  },
  avatar: {
    width: "60px",
    height: "60px"
  },
  nameText: {
    color: "rgba(255, 255, 255, 255)",
    paddingTop: "14%",
    paddingBottom: "10%"
  }
});
export default styles;
