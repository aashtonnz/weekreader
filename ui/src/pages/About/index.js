import React from "react";
import { faRss as rssIcon } from "@fortawesome/free-solid-svg-icons";
import {
  faReddit as redditIcon,
  faYoutube as youtubeIcon,
  faTwitter as twitterIcon,
} from "@fortawesome/free-brands-svg-icons";
import { Link, A, Page, Div } from "../../views/styled";
import {
  SubHeader,
  AppDesc,
  Ul,
  Ol,
  RssIcon,
  RedditIcon,
  YoutubeIcon,
  TwitterIcon,
} from "./styled";

const Landing = () => {
  return (
    <Page>
      <AppDesc>The internet - delivered weekly</AppDesc>
      <Div />
      <SubHeader>How does it work?</SubHeader>
      <Ol>
        <li>
          <Link to="/signup" target="_blank">
            Sign up
          </Link>{" "}
          - no email address required
        </li>
        <li>
          Add{" "}
          <A href="https://rss.com/blog/how-do-rss-feeds-work/" target="_blank">
            RSS
          </A>{" "}
          feeds to your{" "}
          <Link to="/" target="_blank">
            inbox
          </Link>
        </li>
        <li>
          <Link to="/user" target="_blank">
            Set days
          </Link>{" "}
          when your inbox will be updated
        </li>
      </Ol>
      <Div />
      <SubHeader>RSS feeds</SubHeader>
      <Ul>
        <li>Most news sites, blogs, and podcasts support RSS</li>
        <li>
          Look for the RSS icon <RssIcon icon={rssIcon} />
        </li>
        <li>Try example.com/feed or example.com/rss</li>
        <li>
          <RedditIcon icon={redditIcon} /> Reddit -{" "}
          <A
            href="https://reddit.com/r/technology/top/.rss?limit=5"
            target="_blank"
          >
            reddit.com/r/technology/top/.rss?limit=5
          </A>
        </li>
        <li>
          <YoutubeIcon icon={youtubeIcon} /> YouTube -{" "}
          <A href="https://www.youtube.com/subscription_manager?action_takeout=1">
            download RSS feeds
          </A>{" "}
          for your subscriptions
        </li>
        <li>
          <TwitterIcon icon={twitterIcon} /> Twitter, Instagram, and more -{" "}
          <A href="http://fetchrss.com/" target="_blank">
            FetchRSS
          </A>
          ,{" "}
          <A href="https://www.rss.app" target="_blank">
            RSS.app
          </A>
        </li>
      </Ul>
      <Div />
      <SubHeader>Contact</SubHeader>
      <Ul>
        <li>
          Email -{" "}
          <A href="mailto:contact@weekreader.com" target="_blank">
            contact@mail.weekreader.com
          </A>
        </li>
        <li>
          Twitter -{" "}
          <A href="mailto:contact@weekreader.com" target="_blank">
            @weekreader
          </A>
        </li>
        <li>
          This project is{" "}
          <A href="https://github.com/aashtonnz/weekreader" target="_blank">
            open source
          </A>
        </li>
      </Ul>
    </Page>
  );
};

export default Landing;
