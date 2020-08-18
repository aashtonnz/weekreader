import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ActiveIcon = styled(FontAwesomeIcon)`
  margin-left: 0.8rem;
  font-size: 1.7rem;
  padding: 0.16rem 0.26rem 0.36rem 0.26rem;
  visiblity: ${(props) => props.visibility};
  color: ${(props) => props.theme.color.primary};
`;

export const InactiveIcon = styled(ActiveIcon)`
  color: #ddd;
  visiblity: ${(props) => props.visibility};
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 0.4rem;
`;

export const Wrapper = styled.div`
  display: block;
  text-decoration: none;
  padding: 0.6rem 0;
  background: #fff;
  padding-left: 0.3rem;

  &:hover {
    cursor: pointer;
  }

  &:not(:first-of-type) {
    border-top: 1px solid #f3f3f3;
  }

  &:last-of-type {
    padding-bottom: 0rem;
  }
`;

export const Title = styled.a`
  display: block;
  text-decoration: none;
  flex-grow: 1;
  color: #333;

  &:visited {
    color: #aaa;
  }
`;

export const Description = styled.a`
  margin: 0.3rem 1.2rem 0 1.2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #666;
  display: block;
  text-decoration: none;

  &:visited {
    color: #aaa;
  }
`;

export const ShowButton = styled.button`
  border: none;
  background: none;
  margin-left: 0.6rem;
  color: ${(props) => props.theme.color.primary};

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 1.2rem;
`;

export const PublishedAt = styled.span`
  margin-left: 0.5rem;
  color: #aaa;
  white-space: nowrap;
`;
