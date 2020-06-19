import styled from "styled-components";
import theme from "../../theme";
import { Header as ViewHeader } from "../styled";

export const Header = styled(ViewHeader)`
  color: ${theme.color.primary};
`;

export const Wrapper = styled.div`
  height: 30vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 1rem 1.5rem;
`;

export const ErrorName = styled.p`
  margin-top: 1rem;
  font-size: 0.7rem;
`;

export const ErrorMsg = styled.p`
  margin-top: 0.2rem;
  text-align: center;
  font-size: 0.7rem;
`;
