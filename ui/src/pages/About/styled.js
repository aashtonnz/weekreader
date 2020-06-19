import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const AppDesc = styled.h2`
  margin: 2.6rem 0 0 0;
  font-size: 1.2rem;
`;

export const SubHeader = styled.h2`
  margin-bottom: 0.6rem;
  font-size: 1.1rem;
`;

export const Ul = styled.ul`
  margin: 0 1.6rem;

  > li {
    margin: 0.4rem 0;
  }
`;

export const Ol = styled.ol`
  margin: 0 1.6rem;

  > li {
    margin: 0.4rem 0;
  }
`;

export const RssIcon = styled(FontAwesomeIcon)`
  margin-left: 0.2rem;
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
