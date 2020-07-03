import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { signup, setAlert } from "../../state/actions";
import { trimValues } from "../../utils";
import { checkSignup } from "../../utils/validation";
import {
  Input,
  Button,
  Header,
  Link,
  Form,
  SubHeader,
} from "../../views/styled";
import { Page } from "./styled";

const FOCUS_DELAY_MS = 50;

const Signup = ({ signup, setAlert, user }) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    password2: "",
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
    const { email, password, password2 } = trimValues(userData);
    const invalidMsg = checkSignup(email, password, password2);
    if (invalidMsg) {
      setAlert(invalidMsg, "danger");
      return;
    }
    signup(email, password);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <Page>
      <Header>Sign Up</Header>
      <SubHeader>
        or <Link to="/login">log in</Link>
      </SubHeader>
      <Form>
        <Input
          name="email"
          value={userData.email}
          onChange={updateUser}
          type="email"
          placeholder="Email"
          ref={emailInput}
          autoComplete="off"
        />
        <Input
          name="password"
          value={userData.password}
          onChange={updateUser}
          type="password"
          placeholder="Password"
          autoComplete="off"
        />
        <Input
          name="password2"
          value={userData.password2}
          onChange={updateUser}
          type="password"
          placeholder="Confirm Password"
          autoComplete="off"
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
