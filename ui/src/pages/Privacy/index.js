import React from "react";
import { Page, Link } from "../../views/styled";
import { Header } from "./styled";

const Landing = () => {
  return (
    <Page>
      <Header>Privacy Policy</Header>
      <p>
        Your email address is only collected for sending you the RSS
        subscription results. After signing up, you can decide not to recieve
        any emails by changing the settings <Link to="/user">here</Link>. You
        have the right to ask for a copy of any personal information we hold
        about you, and to ask for it to be corrected if you think it is wrong.
        None of your information is retained if you delete your account. If
        you’d like to ask for a copy of your information, or to have it
        corrected, please contact us at{" "}
        <Link to="mailto:contact@weekreader.com">contact@weekreader.com</Link>.
      </p>
    </Page>
  );
};

export default Landing;
