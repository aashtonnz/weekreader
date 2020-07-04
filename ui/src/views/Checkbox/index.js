import React from "react";
import PropTypes from "prop-types";
import {
  faCircle as icon,
  faCheckCircle as checkedIcon,
} from "@fortawesome/free-regular-svg-icons";
import { Icon } from "./styled";

const Checkbox = ({ checked, onChange, value }) => {
  const onClick = () => onChange(value);

  return <Icon onClick={onClick} icon={checked ? checkedIcon : icon} />;
};

Checkbox.propTypes = {
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool,
  value: PropTypes.string,
};

export default Checkbox;
