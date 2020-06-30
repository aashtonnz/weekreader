import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { confirmEmail } from "../state/actions/user";
import { Header, Link } from "../views/styled";
import { Page } from "./Signup/styled";

const NotFound = ({ confirmEmail }) => {
  const { user_id: userId, confirm_id: confirmId } = useParams();
  confirmEmail(userId, confirmId);

  return (
    <Page>
      <Header>Confirmed!</Header>
      <p>
        Return to <Link to="/">inbox</Link>
      </p>
    </Page>
  );
};

NotFound.propTypes = {
  confirmEmail: PropTypes.func.isRequired,
};

export default connect(null, { confirmEmail })(NotFound);
