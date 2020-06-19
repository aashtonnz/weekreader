import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";

export const Button = styled.button`
  font-size: 0.85rem;
  padding: 0 0.8rem;
  height: 28px;
  color: #fff;
  border: none;
  border-radius: 14px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.color.primary};

  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }

  &.danger {
    background: ${(props) => props.theme.color.danger};
  }
`;

export const Input = styled.input`
  width: 100%;
  max-width: 335px;
  font-size: 0.85rem;
  height: 28px;
  padding: 0 0.8rem;
  margin-bottom: 0.9rem;
  border: 1px solid #ddd;
  border-radius: 14px;
  display: flex;
  align-items: center;

  &:first-of-type {
    margin-top: 0.9rem;
  }

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.color.primary};
  }
`;

export const Header = styled.h2`
  font-size: 1.6rem;
  margin-bottom: 0
  padding: 0;
  margin-top: 2.2rem;
  width: 100%;
  text-align: center;
`;

export const Page = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  margin-top: 1.4rem;
  min-height: ${(props) => `calc(100vh - ${props.theme.appBar.heightPx}px)`};
  max-width: ${(props) => props.theme.width.maxPx}px;
`;

export const Link = styled(RouterLink)`
  text-decoration: none;
  color: ${(props) => props.theme.color.primary};
`;

export const Div = styled.div`
  width: 100%;
  border-bottom: 1px solid #eee;
  margin: 1.6rem 0;
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const A = styled.a`
  text-decoration: none;
  text-overflow: ellipsis;
  width: 100%;
  overflow-x: hidden;
  text-align: center;
  color: ${(props) => props.theme.color.primary};
`;
