import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { Button, Input } from "../../views/styled";

export const AddWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 1rem;
`;

export const AddInput = styled(Input)`
  margin-top: 0.9rem;
  max-width: 230px;
`;

export const AddButton = styled(Button)`
  width: 28px;
  height: 28px;
  border-radius: 14px;
  margin-left: 0.5rem;
  padding: 0;
`;

export const MailIcon = styled(FontAwesomeIcon)`
  margin-left: 0.3rem;
`;

export const Header = styled(Link)`
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 2.6rem;
  padding: 0;
  margin-top: 2.2rem;
  width: 100%;
  text-align: center;
  overflow-x: hidden;
  text-decoration: none;
  color: ${(props) => props.theme.color.primary};
`;
