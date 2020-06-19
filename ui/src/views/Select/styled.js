import styled from "styled-components";
import { Button as ViewButton } from "../styled";

export const Button = styled(ViewButton)`
  width: 90px;
  padding-left: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  color: ${(props) => props.theme.color.primary};
  border: 1px solid ${(props) => props.theme.color.primary};

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }

  & > span {
    margin-right: 0.4rem;
  }
`;

export const Option = styled.div`
  text-align: center;
  font-size: 0.85rem;
  color: #333;

  &:hover {
    cursor: pointer;
    background: #f5f5f5;
  }
`;

export const OptionsWrapper = styled.div`
  padding: 14px 0;
  position: absolute;
  border: 1px solid #ddd;
  border-radius: 14px;
  margin-top: 28px;
  background: #fff;
  width: 90px;

  & > div {
    max-height: 200px;
    overflow-y: scroll;
  }
`;

export const OptionWrapper = styled.div`
  padding: 0.3rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0.4rem;
`;
