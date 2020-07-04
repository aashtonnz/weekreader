import styled from "styled-components";
import { Input } from "../../views/styled";

export const SettingWrapper = styled.div`
  margin: 3rem 0 0.6rem 0;
  width: 100%;
  max-width: 335px;
  display: flex;
  align-items: center;
  justify-content: center;

  & > div {
    text-align: center;
  }
`;

export const EmailWrapper = styled(SettingWrapper)`
  margin: 0.6rem 0 1.6rem 0;
`;

export const Day = styled.div`
  font-weight: 700;
  margin-left: 0.2rem;
  color: ${(props) => props.theme.color.primary};
`;

export const DayWrapper = styled(SettingWrapper)`
  margin: 0.6rem 0 0.8rem 0;
`;

export const EmailInput = styled(Input)`
  margin-top: 0 !important;
`;
