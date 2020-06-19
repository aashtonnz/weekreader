import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, isLoading, user, ...other }) => (
  <Route
    {...other}
    render={(props) =>
      !isLoading && !user ? <Redirect to="/login" /> : <Component {...props} />
    }
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  isLoading: state.app.isLoading,
  user: state.user.data,
});

export default connect(mapStateToProps)(PrivateRoute);
