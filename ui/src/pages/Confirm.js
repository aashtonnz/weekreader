import React from "react";
import { useParams } from "react-router-dom";
import { Header, Link } from "../views/styled";
import { Page } from "./Signup/styled";

const NotFound = () => {
  const { user_id: userId, confirm_id: confirmId } = useParams();

  console.log(userId, confirmId);

  return (
    <Page>
      <Header>Confirmed!</Header>
      <p>
        To return to inbox <Link to="/">click here</Link>
      </p>
    </Page>
  );
};

export default NotFound;
