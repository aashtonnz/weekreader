import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import theme from "../../theme";
import AppBar from "../AppBar";
import Footer from "../Footer";
import Spinner from "../Spinner";
import Background from "./Background";
import { Wrapper, Content } from "./styled";

function Root({ isLoading, children }) {
  const [navOpen, setNavOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <AppBar navOpen={navOpen} setNavOpen={setNavOpen} />
        <Background hasShadow={navOpen} onClick={() => setNavOpen(false)} />
        {isLoading && (
          <Content>
            <Spinner />
          </Content>
        )}
        <Content isLoading={isLoading}>{children}</Content>
        <Footer />
      </Wrapper>
    </ThemeProvider>
  );
}

Root.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

const mapStateToProps = (state) => ({
  isLoading: state.app.isLoading,
});

export default connect(mapStateToProps, null)(Root);
