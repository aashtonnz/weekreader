import React from "react";
import { SortableContainer } from "react-sortable-hoc";
import Subscription from "../Subscription";
import { Wrapper, NoContent } from "./styled";

const Subscriptions = SortableContainer(
  ({ subs, filter, showMoreArticles, showLessArticles }) => {
    return (
      <Wrapper>
        {!subs.length ? (
          <NoContent>⁠—</NoContent>
        ) : (
          subs.map((sub, index) => (
            <Subscription
              key={sub._id}
              index={index}
              sub={sub}
              filter={filter}
              showMoreArticles={showMoreArticles}
              showLessArticles={showLessArticles}
            />
          ))
        )}
      </Wrapper>
    );
  }
);

export default Subscriptions;
