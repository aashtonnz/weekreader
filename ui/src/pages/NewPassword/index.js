import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Redirect, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert, newPassword } from "../../state/actions";
import { checkPassword } from "../../utils/validation";
import { Input, Button, Form } from "../../views/styled";
import { Page } from "../Signup/styled";
import { Header } from "./styled";

const FOCUS_DELAY_MS = 50;

const NewPassword = ({ setAlert, user, newPassword }) => {
  const [userData, setUserData] = useState({
    password: "",
    password2: "",
  });
  const passwordInput = useRef(null);
  const { token } = useParams();

  useEffect(() => {
    const timer = setTimeout(
      () => passwordInput.current.focus(),
      FOCUS_DELAY_MS
    );
    return () => clearTimeout(timer);
  }, [passwordInput]);

  const updateUser = (event) =>
    setUserData({ ...userData, [event.target.name]: event.target.value });

  const onSubmit = (event) => {
    event.preventDefault();
    const invalidMsg = checkPassword(userData.password, userData.password2);
    if (invalidMsg) {
      setAlert(invalidMsg, "danger");
    } else {
      newPassword(token, userData.password);
    }
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <Page>
      <Header>New Password</Header>
      <Form>
        <Input
          name="password"
          value={userData.password}
          type="password"
          placeholder="Password"
          onChange={updateUser}
          ref={passwordInput}
        />
        <Input
          name="password2"
          value={userData.password2}
          type="password"
          placeholder="Confirm password"
          onChange={updateUser}
        />
        <Button onClick={onSubmit}>Submit</Button>
      </Form>
    </Page>
  );
};

NewPassword.propTypes = {
  setAlert: PropTypes.func.isRequired,
  newPassword: PropTypes.func.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.user.data,
});

export default connect(mapStateToProps, { setAlert, newPassword })(NewPassword);
