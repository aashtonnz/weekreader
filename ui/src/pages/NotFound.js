import React from "react";
import { Header, Link } from "../views/styled";
import { Page } from "./Signup/styled";

const NotFound = () => (
  <Page>
    <Header>Page Not Found</Header>
    <p>
      Return to <Link to="/">inbox</Link>
    </p>
  </Page>
);

export default NotFound;
