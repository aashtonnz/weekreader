import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import {
  faChevronDown as down,
  faChevronUp as up,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { Wrapper, Button, OptionsWrapper, OptionWrapper } from "./styled";

const Select = ({ children, value, onChange, showSelected = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const optionsRef = useRef();

  const onSelect = (value) => {
    setIsOpen(false);
    onChange(value);
  };

  useEffect(() => {
    const clickListener = (event) => {
      if (isOpen && event.target !== optionsRef.current) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", clickListener);
    return () => document.removeEventListener("click", clickListener);
  }, [isOpen, setIsOpen]);

  const child = children.find((option) => option.props.value === value);

  return (
    <Wrapper>
      <Button onClick={() => setIsOpen(!isOpen)}>
        {child && child.props.children} <Icon icon={isOpen ? up : down} />
      </Button>
      {isOpen && (
        <OptionsWrapper ref={optionsRef}>
          <div>
            {children
              .filter((option) => showSelected || option.props.value !== value)
              .map((option, index) => (
                <OptionWrapper
                  key={index}
                  onClick={() => onSelect(option.props.value)}
                >
                  {option}
                </OptionWrapper>
              ))}
          </div>
        </OptionsWrapper>
      )}
    </Wrapper>
  );
};

Select.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  showSelected: PropTypes.bool,
};

export default Select;
