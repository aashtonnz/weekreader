import React from "react";
import { Header, Link } from "../views/styled";
import { Page } from "./Signup/styled";

const NotFound = () => (
  <Page>
    <Header>Page Not Found</Header>
    <p>
      To return to inbox <Link to="/">click here</Link>
    </p>
  </Page>
);

export default NotFound;
