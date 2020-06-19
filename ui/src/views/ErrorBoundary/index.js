import React from "react";
import { Header, Wrapper, ErrorName, ErrorMsg } from "./styled";

class ErrorBoundary extends React.Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error) {
    this.setState({ error });
  }

  render() {
    const { error } = this.state;

    if (!error) {
      return this.props.children;
    }

    return (
      <Wrapper>
        <Header>Something went wrong :/</Header>
        <ErrorName>{error.name}</ErrorName>
        <ErrorMsg>{error.message}</ErrorMsg>
      </Wrapper>
    );
  }
}

export default ErrorBoundary;
