import React from "react";
import styled from "styled-components";
import spinner from "./spinner.svg";

const Img = styled.img`
  margin-top: 20vh;
  display: block;
`;

const Spinner = () => <Img src={spinner} alt="Loading..." />;

export default Spinner;
