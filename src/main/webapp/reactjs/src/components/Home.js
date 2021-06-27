import React from "react";
import { connect } from "react-redux";
import authToken from "../utils/authToken";
import { Alert } from "react-bootstrap";

const Home = (props) => {
  if (localStorage.jwtToken) {
    authToken(localStorage.jwtToken);
  }
  return (
    <Alert style={{ backgroundColor: "#343A40", color: "#ffffff80" }}>
      Welcome {props.auth.username}
    </Alert>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Home);
