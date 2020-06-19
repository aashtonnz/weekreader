import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Icon = styled(FontAwesomeIcon)`
  color: #ddd;
  margin-left: 0.8rem;
  font-size: 1.7rem;
  padding: 0.26rem;

  &:hover {
    cursor: pointer;
  }
`;

export const Img = styled.img`
  margin-right: 0.5rem;
  height: 1.1rem;
  max-width: 75px;
`;

export const HeaderWrapper = styled.div`
  flex-grow: 1;
`;

export const Header = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #333;
  max-width: max-content;
  margin-right: 1rem;
  font-weight: 700;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0.4rem 0.2rem 0.4rem 0;
  border-bottom: 1px solid #f3f3f3;
  background: #fff;
  width: 100%;
`;

export const IconWrapper = styled.div`
  display: flex;
`;

export const NumArticles = styled.div`
  margin-left: 0.4rem;
  font-weight: 400;
  color: #aaa;
`;
