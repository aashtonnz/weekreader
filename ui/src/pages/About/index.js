import React from "react";
import {
  faRss as rssIcon,
  faEnvelopeOpenText as mailIcon,
} from "@fortawesome/free-solid-svg-icons";
import {
  faReddit as redditIcon,
  faYoutube as youtubeIcon,
  faTwitter as twitterIcon,
} from "@fortawesome/free-brands-svg-icons";
import { Link, A, Page, Div } from "../../views/styled";
import {
  Header,
  P,
  LastP,
  RssIcon,
  RedditIcon,
  YoutubeIcon,
  TwitterIcon,
  MailIcon,
} from "./styled";

const Landing = () => {
  return (
    <Page>
      <Header>
        RSS – emailed to you <MailIcon icon={mailIcon} />
      </Header>
      <P>
        1.{" "}
        <A href="https://contacts.google.com/" target="_blank">
          Add contact
        </A>{" "}
        new@mail.weekreader.com
      </P>
      <P>
        2.{" "}
        <Link to="/signup" target="_blank">
          Sign up
        </Link>{" "}
        and{" "}
        <Link to="/" target="_blank">
          add feeds
        </Link>{" "}
        to your inbox
      </P>
      <LastP>
        3.{" "}
        <Link to="/user" target="_blank">
          Set when
        </Link>{" "}
        your inbox will update
      </LastP>
      <Div />
      <LastP>
        <RssIcon icon={rssIcon} />{" "}
        <A href="https://rss.com/blog/how-do-rss-feeds-work/" target="_blank">
          How does RSS work?
        </A>
      </LastP>
      <Div />
      <P>
        <RedditIcon icon={redditIcon} /> Reddit –{" "}
        <A
          href="https://reddit.com/r/technology/top/.rss?limit=5"
          target="_blank"
        >
          reddit.com/r/technology/top/.rss?limit=5
        </A>
      </P>
      <P>
        <YoutubeIcon icon={youtubeIcon} /> YouTube –{" "}
        <A href="https://www.youtube.com/subscription_manager?action_takeout=1">
          download RSS feeds
        </A>{" "}
        for your subscriptions
      </P>
      <LastP>
        <TwitterIcon icon={twitterIcon} /> Twitter, Instagram –{" "}
        <A href="http://fetchrss.com/" target="_blank">
          FetchRSS
        </A>
        ,{" "}
        <A href="https://www.rss.app" target="_blank">
          RSS.app
        </A>
      </LastP>
      <Div />
      <P>
        <A href="mailto:contact@weekreader.com" target="_blank">
          contact@weekreader.com
        </A>
      </P>
      <LastP>
        <A href="https://twitter.com/weekreader" target="_blank">
          @weekreader
        </A>
      </LastP>
    </Page>
  );
};

export default Landing;
