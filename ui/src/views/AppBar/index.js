import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { clearAlert } from "../../state/actions";
import logo from "../../assets/logo.png";
import Alert from "../Alert";
import NavButton from "./NavButton";
import NavLinks from "./NavLinks";
import {
  Wrapper,
  Bar,
  Header,
  Logo,
  Nav,
  PrimaryLink,
  AppLink,
} from "./styled";
import moment from "moment";

const AppBar = ({ navOpen, setNavOpen, clearAlert, isLoading, user }) => {
  const closeNav = () => setNavOpen(false);

  const toggleNav = () => {
    setNavOpen(!navOpen);
    clearAlert();
  };

  return (
    <Wrapper>
      <Bar>
        <Header>
          <AppLink to="/">
            <Logo src={logo} alt="logo" />
            <div>Weekreader</div>
          </AppLink>
        </Header>
        {!isLoading && (
          <>
            {user ? (
              <PrimaryLink onClick={closeNav} to="/user">
                {moment(user.articlesUpdatedAt).format("MMMM D")}
              </PrimaryLink>
            ) : (
              <PrimaryLink onClick={closeNav} to="/signup">
                Sign Up
              </PrimaryLink>
            )}
            <NavButton navOpen={navOpen} onClick={toggleNav} />
          </>
        )}
      </Bar>
      <Nav isOpen={navOpen} isAuthenticated={Boolean(user)}>
        <NavLinks onClick={closeNav} />
      </Nav>
      <Alert />
    </Wrapper>
  );
};

AppBar.propTypes = {
  navOpen: PropTypes.bool.isRequired,
  setNavOpen: PropTypes.func.isRequired,
  clearAlert: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  isLoading: state.app.isLoading,
  user: state.user.data,
});

export default connect(mapStateToProps, { clearAlert })(AppBar);
