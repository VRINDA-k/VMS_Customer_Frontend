import React, { Component } from "react";
import propTypes from "prop-types";
import { Container, Row, Col } from "react-grid-system";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { Restaurant, TransferWithinAStation } from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import { css } from "aphrodite";

import { submitLogin } from "../../data/session/actions";
import CurvedTextfield from "../../components/textfields/curvedTextfield";
import CurvedButton from "../../components/buttons/curvedButton";

import styles from "./styles";

import { VISITOR_HOME } from "../../config/appUrls";
import { showAlert } from "../../components/snackbar/data/actions";
import { resetLogin } from "../../data/session/actions";

import UlcpLogo from "../../assets/images/logo.png";
import UltsLogo from "../../assets/images/ults-logo.png";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        username: "",
        password: ""
      }
    };
  }
  componentDidMount() {
    if (this.props.loginSuccess) {
      this.props.navigateTo(VISITOR_HOME);
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.loginSuccess) {
      this.props.navigateTo(VISITOR_HOME);
    }

    if (this.props.error !== prevProps.error) {
      let messageInfo = { message: this.props.error, variant: "error" };
      this.props.showAlert(messageInfo);

      // this.props.resetLogin();
    }
  }

  handleChange = event => {
    this.setState({
      data: { ...this.state.data, [event.target.name]: event.target.value }
    });
  };
  onSubmit = event => {
    event.preventDefault();
    const params = {
      username: this.state.data.username,
      password: this.state.data.password
    };
    this.props.submitLogin(params);
  };

  render() {
    return (
      <Container className={css(styles.containerStyle)} fluid>
        <Row className={css(styles.rowStyle)}>
          <Col className={css(styles.leftColStyle)} sm={6}>
            <div className={css(styles.featuresStyle)}>
              <Typography color="inherit" variant="h5">
                <ul className={css(styles.listStyle)}>
                  <li className={css(styles.liStyle)}>
                    <Restaurant className={css(styles.featureIconStyle)} />
                    Pre-order your food
                  </li>
                  <li>
                    <TransferWithinAStation
                      className={css(styles.featureIconStyle)}
                    />
                    Schedule your visit
                  </li>
                </ul>
              </Typography>
            </div>
          </Col>
          <Col className={css(styles.rightColStyle)} sm={6}>
            <img
              className={css(styles.brandLogoStyle)}
              src={UlcpLogo}
              alt="UL Cyberpark logo"
            />
            <form
              onSubmit={e => this.onSubmit(e)}
              className={css(styles.formStyle)}
            >
              <CurvedTextfield
                value={this.state.username}
                maxLength={30}
                type="text"
                name="username"
                placeholder="Username"
                onChange={e => this.handleChange(e)}
              />
              <CurvedTextfield
                value={this.state.password}
                maxLength={30}
                type="password"
                name="password"
                placeholder="Password"
                onChange={e => this.handleChange(e)}
              />
              <CurvedButton
                value="Login"
                type="submit"
                variant="contained"
                color="primary"
              />
            </form>
            <Typography variant="body1" color="inherit">
              Or
            </Typography>
            <CurvedButton
              value="Sign Up"
              variant="contained"
              color="secondary"
              disabled={true}
            />
            <span className={css(styles.poweredByStyle)}>
              <Typography variant="body1" color="inherit">
                Powered By
              </Typography>
              <img
                className={css(styles.poweredByLogoStyle)}
                src={UltsLogo}
                alt="UL Technology Solutions logo"
              />
            </span>
          </Col>
        </Row>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoading: state.auth.isLoading,
    data: state.auth.loginData,
    error: state.auth.loginError,
    loginSuccess: state.auth.isLoggedIn
  };
}

function mapDispatchToProps(dispatch) {
  return {
    submitLogin: data => dispatch(submitLogin(data)),
    navigateTo: url => dispatch(push(url)),
    showAlert: messageInfo => dispatch(showAlert(messageInfo)),
    resetLogin: () => dispatch(resetLogin())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
