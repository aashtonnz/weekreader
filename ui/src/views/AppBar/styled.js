import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link as RouterLink } from "react-router-dom";
import { Link as ViewLink } from "../styled";

export const Wrapper = styled.div`
  width: 100%;
  position: fixed;
  z-index: 999999999;
  background: #fff;
`;

export const Bar = styled.div`
  margin: 0 auto;
  padding: 0 0.4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: ${(props) => props.theme.width.maxPx}px;
  height: ${(props) => props.theme.appBar.heightPx}px;
`;

export const Logo = styled.img`
  height: 1.3rem;
  padding: 0 0.3rem;
`;

export const NavButtonIcon = styled(FontAwesomeIcon)`
  padding: 0.5rem 0.7rem;
  box-sizing: content-box;
  font-size: 1.2rem;
  color: ${(props) => props.theme.color.primary};
  min-width: 1.2rem;

  &:hover {
    cursor: pointer;
  }
`;

export const NavIcon = styled(FontAwesomeIcon)`
  margin-left: 0.8rem;
  box-sizing: content-box;
  font-size: 0.85rem;
  color: ${(props) => props.theme.color.primary};
  min-width: 1.1rem;
`;

export const Nav = styled.nav`
  margin: 0 auto;
  transition: max-height 0.4s;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  padding-right: 1.2rem;
  overflow: hidden;
  max-width: ${(props) => props.theme.width.maxPx}px;
  max-height: ${({ isOpen, isAuthenticated, theme }) =>
    isOpen
      ? theme.appBar.navHeight[isAuthenticated ? "authPx" : "unauthPx"]
      : 0}px;
`;

export const NavLink = styled(ViewLink)`
  margin-bottom: 1.4rem;
  color: ${(props) => props.theme.color.primary};
  font-weight: 700;
  display: flex;
  align-items: center;

  &:first-child {
    margin-top: 1rem;
  }
`;

export const PrimaryLink = styled(ViewLink)`
  font-weight: 700;
  color: ${(props) => props.theme.color.primary};
`;

export const AppLink = styled(RouterLink)`
  text-decoration: none;
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.color.primary};

  > div {
    font-weight: 700;
  }
`;

export const Header = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: flex-start;
`;
