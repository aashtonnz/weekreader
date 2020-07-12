import styled from "styled-components";
import { Header as ViewHeader } from "../../views/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Header = styled(ViewHeader)`
  margin-bottom: 1.8rem;
`;

export const RssIcon = styled(FontAwesomeIcon)`
  margin-right: 0.2rem;
  color: #f2890a;
`;

export const RedditIcon = styled(FontAwesomeIcon)`
  margin-right: 0.2rem;
  color: #f84302;
`;

export const YoutubeIcon = styled(FontAwesomeIcon)`
  margin-right: 0.2rem;
  color: #ff0000;
`;

export const TwitterIcon = styled(FontAwesomeIcon)`
  margin-right: 0.2rem;
  color: #1da1f2;
`;

export const P = styled.p`
  text-align: center;
  margin-bottom: 0.9rem;
  width: 100%;
`;

export const LastP = styled(P)`
  margin-bottom: 0;
`;
