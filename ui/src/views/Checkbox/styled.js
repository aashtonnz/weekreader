import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Icon = styled(FontAwesomeIcon)`
  font-size: 1.2rem;
  margin: 0 0 0 0.4rem;
  color: ${(props) => props.theme.color.primary};

  &:hover {
    cursor: pointer;
  }
`;
