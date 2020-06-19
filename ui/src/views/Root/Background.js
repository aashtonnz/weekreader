import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Shadow } from "./styled";

const DELAY_HIDE_MS = 400;
const DELAY_SHADOW_MS = 20;

const Background = ({ hasShadow, onClick }) => {
  const [show, setShow] = useState(false);
  const [shadow, setShadow] = useState(false);

  useEffect(() => {
    let shadowTimer = null;
    let hideTimer = null;

    shadowTimer = setTimeout(() => setShadow(hasShadow), DELAY_SHADOW_MS);
    if (hasShadow) {
      setShow(true);
    } else {
      hideTimer = setTimeout(() => setShow(false), DELAY_HIDE_MS);
    }
    return () => {
      clearTimeout(shadowTimer);
      clearTimeout(hideTimer);
    };
  }, [hasShadow]);

  return !show ? null : <Shadow hasShadow={shadow} onClick={onClick} />;
};

Background.propTypes = {
  hasShadow: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Background;
