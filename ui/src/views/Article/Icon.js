import React from "react";
import PropTypes from "prop-types";
import { InactiveIcon, ActiveIcon } from "./styled";

function Icon({ icon, onClick, active = false, visible = true }) {
  const visibility = visible ? "normal" : "hidden";

  return active ? (
    <ActiveIcon icon={icon} onClick={onClick} visibility={visibility} />
  ) : (
    <InactiveIcon icon={icon} onClick={onClick} visibility={visibility} />
  );
}

Icon.propTypes = {
  icon: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  active: PropTypes.bool,
  visible: PropTypes.bool,
};

export default Icon;
