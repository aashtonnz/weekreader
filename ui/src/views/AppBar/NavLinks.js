import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  faInbox as inboxIcon,
  faBookmark as bookmarkIcon,
  faTimes as hiddenIcon,
  faQuestionCircle as aboutIcon,
  faUserCircle as userIcon,
  faSignInAlt as loginIcon,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, NavIcon } from "./styled";

const NavLinks = ({ user, onClick }) => {
  return (
    <>
      {!user ? (
        <>
          <NavLink onClick={onClick} to="/about">
            About <NavIcon icon={aboutIcon} />
          </NavLink>
          <NavLink onClick={onClick} to="/login">
            Log In <NavIcon icon={loginIcon} />
          </NavLink>
        </>
      ) : (
        <>
          <NavLink onClick={onClick} to="/">
            Inbox <NavIcon icon={inboxIcon} />
          </NavLink>
          <NavLink onClick={onClick} to="/bookmarked">
            Bookmarked <NavIcon icon={bookmarkIcon} />
          </NavLink>
          <NavLink onClick={onClick} to="/hidden">
            Hidden Articles <NavIcon icon={hiddenIcon} />
          </NavLink>
          <NavLink onClick={onClick} to="/about">
            About <NavIcon icon={aboutIcon} />
          </NavLink>
          <NavLink onClick={onClick} to="/user">
            {user.username} <NavIcon icon={userIcon} />
          </NavLink>
        </>
      )}
    </>
  );
};

NavLinks.propTypes = {
  user: PropTypes.object,
  onClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user.data,
});

export default connect(mapStateToProps, {})(NavLinks);
