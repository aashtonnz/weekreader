import styled from "styled-components";
import { Button } from "../../views/styled";

export const FileWrapper = styled.div`
  margin: 0 0 0.8rem 0;
  width: 100%;
  max-width: 335px;
  display: flex;
  align-items: center;
  justify-content: center;

  & > div {
    text-align: center;
  }
`;

export const FileInput = styled.input`
  background: inherit;
  color: #888;
  padding: 8px 10px;
  max-width: 200px;
`;

export const UnsubButton = styled(Button)`
  margin-top: 0.6rem;
`;

export const Img = styled.img`
  margin-right: 0.5rem;
  height: 1.1rem;
  max-width: 75px;
`;

export const Header = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #333;
  max-width: max-content;
  margin-right: 1rem;
  font-weight: 700;
  margin-top: 2.2rem;
`;
