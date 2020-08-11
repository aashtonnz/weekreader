import React from "react";
import { Wrapper, Link } from "./styled";

const Footer = () => (
  <Wrapper>
    © Weekreader {new Date().getFullYear()}. Icon made by Freepik from
    www.flaticon.com. <Link to="/privacy">Privacy Policy</Link>.
  </Wrapper>
);

export default Footer;
