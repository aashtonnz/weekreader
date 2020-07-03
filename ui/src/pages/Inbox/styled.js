import styled from "styled-components";
import { Button, Input } from "../../views/styled";

export const AddWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 1rem;
`;

export const AddInput = styled(Input)`
  margin-top: 0.9rem;
  max-width: 230px;
`;

export const AddButton = styled(Button)`
  width: 28px;
  height: 28px;
  border-radius: 14px;
  margin-left: 0.5rem;
  padding: 0;
`;
