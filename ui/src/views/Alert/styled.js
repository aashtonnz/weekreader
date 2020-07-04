import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  text-align: center;
  color: #fff;
  font-size: 0.85rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.color.primary};
  height: ${(props) => props.theme.appBar.heightPx}px;

  &.danger {
    background: ${(props) => props.theme.color.danger};
  }
`;
