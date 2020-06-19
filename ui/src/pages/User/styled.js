import styled from "styled-components";
import { Button } from "../../views/styled";

export const LogoutButton = styled(Button)`
  margin-top: 0.4rem;
`;

export const HourWrapper = styled.div`
  margin: 0.2rem 0 0.6rem 0;
  width: 100%;
  max-width: 335px;
  display: flex;
  align-items: center;
  justify-content: center;

  & > div {
    text-align: center;
  }
`;

export const Day = styled.div`
  font-weight: 700;
  color: ${(props) => props.theme.color.primary};
`;

export const DayWrapper = styled.div`
  margin: 0.6rem 0 0.8rem 0;
  width: 100%;
  max-width: 335px;
  display: flex;
  align-items: center;
  justify-content: center;

  & > div {
    text-align: center;
  }
`;
