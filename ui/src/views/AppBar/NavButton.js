import React from "react";
import PropTypes from "prop-types";
import {
  faChevronDown as downIcon,
  faChevronUp as upIcon
} from "@fortawesome/free-solid-svg-icons";
import { NavButtonIcon } from "./styled";

const NavButton = ({ onClick, navOpen }) => (
  <NavButtonIcon icon={navOpen ? upIcon : downIcon} onClick={onClick} />
);

NavButton.propTypes = {
  onClick: PropTypes.func,
  navOpen: PropTypes.bool.isRequired
};

export default NavButton;
