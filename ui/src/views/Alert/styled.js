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
  height: 1.8rem;
  background: ${(props) => props.theme.color.primary};

  &.danger {
    background: ${(props) => props.theme.color.danger};
  }
`;
