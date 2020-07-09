import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { mailUnsubscribe } from "../state/actions/user";
import { Header } from "../views/styled";
import { Page } from "./Signup/styled";

const NotFound = ({ mailUnsubscribe }) => {
  const { token } = useParams();
  mailUnsubscribe(token);

  return (
    <Page>
      <Header>Unsubscribed!</Header>
    </Page>
  );
};

NotFound.propTypes = {
  mailUnsubscribe: PropTypes.func.isRequired,
};

export default connect(null, { mailUnsubscribe })(NotFound);
