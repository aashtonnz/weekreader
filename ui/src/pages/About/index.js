import React from "react";
import { faRss as rssIcon } from "@fortawesome/free-solid-svg-icons";
import {
  faReddit as redditIcon,
  faYoutube as youtubeIcon,
  faTwitter as twitterIcon,
} from "@fortawesome/free-brands-svg-icons";
import { Link, A, Page, Div } from "../../views/styled";
import {
  Header,
  P,
  RssIcon,
  RedditIcon,
  YoutubeIcon,
  TwitterIcon,
} from "./styled";

const Landing = () => {
  return (
    <Page>
      <Header>What is Weekreader?</Header>
      <P>
        <Link to="/signup" target="_blank">
          Sign up
        </Link>{" "}
        and{" "}
        <Link to="/" target="_blank">
          add RSS feeds
        </Link>{" "}
        to your inbox
      </P>
      <P>
        <Link to="/user" target="_blank">
          Set when
        </Link>{" "}
        your inbox is updated
      </P>
      <P>Receive the top articles from the week</P>
      <Div />
      <P>
        <A href="https://rss.com/blog/how-do-rss-feeds-work/" target="_blank">
          RSS
        </A>{" "}
        is supported by most news sites, blogs, and podcasts
      </P>
      <P>
        Look for the RSS icon <RssIcon icon={rssIcon} />
      </P>
      <P>Try example.com/feed or example.com/rss</P>
      <P>
        <RedditIcon icon={redditIcon} /> Reddit -{" "}
        <A
          href="https://reddit.com/r/technology/top/.rss?limit=5"
          target="_blank"
        >
          reddit.com/r/technology/top/.rss?limit=5
        </A>
      </P>
      <P>
        <YoutubeIcon icon={youtubeIcon} /> YouTube -{" "}
        <A href="https://www.youtube.com/subscription_manager?action_takeout=1">
          download RSS feeds
        </A>{" "}
        for your subscriptions
      </P>
      <P>
        <TwitterIcon icon={twitterIcon} /> Twitter, Instagram -{" "}
        <A href="http://fetchrss.com/" target="_blank">
          FetchRSS
        </A>
        ,{" "}
        <A href="https://www.rss.app" target="_blank">
          RSS.app
        </A>
      </P>
      <Div />
      <P>
        <A href="mailto:contact@weekreader.com" target="_blank">
          contact@mail.weekreader.com
        </A>
      </P>
      <P>
        <A href="https://twitter.com/weekreader" target="_blank">
          @weekreader
        </A>
      </P>
      <P>
        <A href="https://github.com/aashtonnz/weekreader" target="_blank">
          This project is open source
        </A>
      </P>
    </Page>
  );
};

export default Landing;
