import styled from "styled-components";
import { Input } from "../../views/styled";

export const FileWrapper = styled.div`
  margin: 0 0 0.2rem 0;
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
  margin: 0.6rem 0 1rem 0;
`;

export const TitleInput = styled(Input)`
  margin-top: 1rem;
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
  margin-bottom: 0.2rem;
`;

export const CheckboxWrapper = styled.div`
  width: 100%;
  max-width: 335px;
  display: flex;
  align-items: center;
  justify-content: center;

  & > div {
    text-align: center;
  }
`;

export const MaxArticlesWrapper = styled.div`
  margin: 0.8rem 0 0.2rem 0;
  width: 100%;
  max-width: 335px;
  display: flex;
  align-items: center;
  justify-content: center;

  & > div {
    text-align: center;
  }
`;
