import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import arrayMove from "array-move";
import { faEnvelopeOpenText as mailIcon } from "@fortawesome/free-solid-svg-icons";
import {
  setDefaultSubs,
  showMoreArticles,
  showLessArticles,
  moveSub,
} from "../../state/actions";
import Subscriptions from "../../views/Subscriptions";
import { INBOX } from "../../views/Subscription/filters";
import { Page } from "../../views/styled";
import { MailIcon, Header } from "./styled";
import Add from "./Add";

const SHOW_DELAY_MS = 400;

const Inbox = ({
  setDefaultSubs,
  showMoreArticles,
  showLessArticles,
  moveSub,
  defaultSubs,
  user,
}) => {
  const [subs, setSubs] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!user && !defaultSubs) {
      setDefaultSubs();
    }
    if (user) {
      const newSubs = user.subscriptions.filter((sub) => sub.isSubscribed);
      setSubs(newSubs);
      return;
    }
    if (defaultSubs) {
      setSubs(defaultSubs);
      return;
    }
  }, [defaultSubs, setDefaultSubs, user, setSubs]);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, [show]);

  const onMoveSub = ({ oldIndex, newIndex }) => {
    setSubs(arrayMove(subs, oldIndex, newIndex));
    moveSub(subs[oldIndex].index, subs[newIndex].index);
  };

  return (
    <Page>
      {!user && (
        <Header to="/about">
          RSS – mailed to you <MailIcon icon={mailIcon} />
        </Header>
      )}
      <Add />
      {show && (
        <Subscriptions
          subs={subs}
          filter={INBOX}
          onSortEnd={onMoveSub}
          useDragHandle
          showMoreArticles={showMoreArticles}
          showLessArticles={showLessArticles}
        />
      )}
    </Page>
  );
};

Inbox.propTypes = {
  setDefaultSubs: PropTypes.func.isRequired,
  showMoreArticles: PropTypes.func.isRequired,
  showLessArticles: PropTypes.func.isRequired,
  moveSub: PropTypes.func.isRequired,
  defaultSubs: PropTypes.array,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  defaultSubs: state.defaultSubs.data,
  user: state.user.data,
});

export default connect(mapStateToProps, {
  setDefaultSubs,
  showMoreArticles,
  showLessArticles,
  moveSub,
})(Inbox);
