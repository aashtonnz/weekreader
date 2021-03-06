import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert, resetPasswordEmail } from "../../state/actions";
import { checkEmail } from "../../utils/validation";
import { Input, Button, Form } from "../../views/styled";
import { Page } from "../Signup/styled";
import { Header } from "./styled";

const FOCUS_DELAY_MS = 50;

const ResetPasswordEmail = ({ setAlert, resetPasswordEmail, user }) => {
  const [email, setEmail] = useState("");
  const emailInput = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => emailInput.current.focus(), FOCUS_DELAY_MS);
    return () => clearTimeout(timer);
  }, [emailInput]);

  const updateUser = (event) => setEmail(event.target.value);

  const onSubmit = (event) => {
    event.preventDefault();
    const trimEmail = email.trim();
    const invalidMsg = checkEmail(trimEmail);

    if (invalidMsg) {
      setAlert(invalidMsg, "danger");
    } else {
      resetPasswordEmail(trimEmail);
    }
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <Page>
      <Header>Reset Password</Header>
      <Form>
        <Input
          name="email"
          value={email}
          type="email"
          placeholder="Email"
          onChange={updateUser}
          ref={emailInput}
        />
        <Button onClick={onSubmit}>Submit</Button>
      </Form>
    </Page>
  );
};

ResetPasswordEmail.propTypes = {
  setAlert: PropTypes.func.isRequired,
  resetPasswordEmail: PropTypes.func.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.user.data,
});

export default connect(mapStateToProps, { setAlert, resetPasswordEmail })(
  ResetPasswordEmail
);
