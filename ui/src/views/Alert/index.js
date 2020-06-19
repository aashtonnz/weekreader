import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Wrapper } from "./styled";

const Alert = ({ alert }) =>
  alert ? (
    <Wrapper key={alert.id} className={alert.status}>
      {alert.msg}
    </Wrapper>
  ) : null;

Alert.propTypes = {
  alert: PropTypes.object,
};

const mapStateToProps = (state) => ({
  alert: state.app.alert,
});

export default connect(mapStateToProps)(Alert);
