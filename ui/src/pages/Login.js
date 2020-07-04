import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert, login } from "../state/actions";
import { checkLogin } from "../utils/validation";
import { Input, Button, Header, Link, Form, SubHeader } from "../views/styled";
import { Page } from "./Signup/styled";

const FOCUS_DELAY_MS = 50;

const Login = ({ setAlert, login, user }) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const emailInput = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => emailInput.current.focus(), FOCUS_DELAY_MS);
    return () => clearTimeout(timer);
  }, [emailInput]);

  const updateUser = (event) =>
    setUserData({ ...userData, [event.target.name]: event.target.value });

  const onSubmit = (event) => {
    event.preventDefault();
    const email = userData.email.trim();
    const invalidMsg = checkLogin(email, userData.password);

    if (invalidMsg) {
      setAlert(invalidMsg, "danger");
    } else {
      login(email, userData.password);
    }
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <Page>
      <Header>Log In</Header>
      <SubHeader>
        or <Link to="/signup">sign up</Link>
      </SubHeader>
      <Form>
        <Input
          name="email"
          value={userData.email}
          type="email"
          placeholder="Email"
          onChange={updateUser}
          ref={emailInput}
        />
        <Input
          name="password"
          value={userData.password}
          type="password"
          placeholder="Password"
          onChange={updateUser}
        />
        <Button onClick={onSubmit}>Submit</Button>
      </Form>
    </Page>
  );
};

Login.propTypes = {
  setAlert: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.user.data,
});

export default connect(mapStateToProps, { setAlert, login })(Login);
