import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Shadow = styled.div`
  transition: background 0.38s;
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, ${(props) => (props.hasShadow ? 0.4 : 0)});
`;

export const Content = styled.div`
  min-height: 100vh;
  width: 100%;
  flex-direction: column;
  align-items: center;
  display ${(props) => (props.isLoading ? "none" : "flex")};
`;
