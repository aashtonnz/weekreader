import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  margin: 1.4rem 0;
  background: #fff;
`;

export const NoArticles = styled.div`
  color: #ddd;
  margin-top: 0.4rem;
  margin-left: 1.2rem;
`;

export const ShowButton = styled.button`
  border: none;
  background: none;
  margin-left: 0.6rem;
  margin-right: 1rem;
  color: ${(props) => props.theme.color.primary};

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }
`;

export const Articles = styled.div`
  width: 100%;
`;
