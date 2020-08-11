import styled from "styled-components";
import { Link as ViewLink } from "react-router-dom";

export const Wrapper = styled.footer`
  color: #aaa;
  padding: 0.5rem;
  text-align: center;
`;

export const Link = styled(ViewLink)`
  text-decoration: none;
  color: ${(props) => props.theme.color.primary};
`;
