import React, { useMemo, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { showMoreArticles, showLessArticles } from "../state/actions";
import { filterArticles } from "../views/Subscription/utils";
import Subscriptions from "../views/Subscriptions";
import { BOOKMARKED } from "../views/Subscription/filters";
import { Page, Header } from "../views/styled";

const SHOW_DELAY_MS = 400;

const Bookmarked = ({ showMoreArticles, showLessArticles, user }) => {
  const [show, setShow] = useState(false);
  const subs = useMemo(
    () =>
      !user
        ? []
        : user.subscriptions.filter(
            (sub) => filterArticles(sub.articles, BOOKMARKED).length
          ),
    [user]
  );

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, [show]);

  return (
    <Page>
      <Header>Bookmarked</Header>
      {show && (
        <Subscriptions
          subs={subs}
          filter={BOOKMARKED}
          onSortEnd={() => {}}
          useDragHandle
          showMoreArticles={showMoreArticles}
          showLessArticles={showLessArticles}
        />
      )}
    </Page>
  );
};

Bookmarked.propTypes = {
  showMoreArticles: PropTypes.func.isRequired,
  showLessArticles: PropTypes.func.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.user.data,
});

export default connect(mapStateToProps, {
  showMoreArticles,
  showLessArticles,
})(Bookmarked);
