import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert, login } from "../state/actions";
import { trimValues } from "../utils";
import { checkLogin } from "../utils/validation";
import { Input, Button, Header, Link, Form } from "../views/styled";
import { Page } from "./Signup/styled";

const FOCUS_DELAY_MS = 50;

const Login = ({ setAlert, login, user }) => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const usernameInput = useRef(null);

  useEffect(() => {
    const timer = setTimeout(
      () => usernameInput.current.focus(),
      FOCUS_DELAY_MS
    );
    return () => clearTimeout(timer);
  }, [usernameInput]);

  const updateUser = (event) =>
    setUserData({ ...userData, [event.target.name]: event.target.value });

  const onSubmit = (event) => {
    event.preventDefault();
    const { username, password } = trimValues(userData);
    const invalidMsg = checkLogin(username, password);

    if (invalidMsg) {
      setAlert(invalidMsg, "danger");
    } else {
      login(username, password);
    }
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <Page>
      <Header>Log In</Header>
      <div>
        or <Link to="/signup">sign up</Link>
      </div>
      <Form>
        <Input
          name="username"
          value={userData.username}
          type="text"
          placeholder="Username"
          onChange={updateUser}
          ref={usernameInput}
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
