import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { signup, setAlert } from "../../state/actions";
import { trimValues } from "../../utils";
import { checkSignup } from "../../utils/validation";
import { Input, Button, Header, Link, Form } from "../../views/styled";
import { Page } from "./styled";

const FOCUS_DELAY_MS = 50;

const Signup = ({ signup, setAlert, user }) => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
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
    const { username, email, password, password2 } = trimValues(userData);
    const invalidMsg = checkSignup(username, email, password, password2);
    if (invalidMsg) {
      setAlert(invalidMsg, "danger");
      return;
    }
    signup(username, email, password);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <Page>
      <Header>Sign Up</Header>
      <div>
        or <Link to="/login">log in</Link>
      </div>
      <Form>
        <Input
          name="username"
          value={userData.username}
          onChange={updateUser}
          type="text"
          placeholder="Username"
          ref={usernameInput}
        />
        <Input
          name="email"
          value={userData.email}
          onChange={updateUser}
          type="text"
          placeholder="Email (optional)"
        />
        <Input
          name="password"
          value={userData.password}
          onChange={updateUser}
          type="password"
          placeholder="Password"
        />
        <Input
          name="password2"
          value={userData.password2}
          onChange={updateUser}
          type="password"
          placeholder="Confirm Password"
        />
        <Button onClick={onSubmit}>Submit</Button>
      </Form>
    </Page>
  );
};

Signup.propTypes = {
  signup: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.user.data,
});

export default connect(mapStateToProps, { signup, setAlert })(Signup);
