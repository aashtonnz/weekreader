import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { confirm } from "../state/actions/user";
import { Header, Link } from "../views/styled";
import { Page } from "./Signup/styled";

const NotFound = ({ confirm }) => {
  const { token } = useParams();
  confirm(token);

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
  confirm: PropTypes.func.isRequired,
};

export default connect(null, { confirm })(NotFound);
