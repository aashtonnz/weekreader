import React from "react";
import { SortableElement } from "react-sortable-hoc";
import SubTitle from "../SubTitle";
import Article from "../Article";
import { filterArticles } from "./utils";
import { Wrapper, ShowButton, Articles } from "./styled";

const Subscription = SortableElement(
  ({ sub, filter, showMoreArticles, showLessArticles }) => {
    const articles = filterArticles(sub.articles, filter);
    return (
      <Wrapper key={sub._id} filter={filter}>
        <SubTitle
          {...sub}
          collapsed={sub[`${filter}Collapsed`]}
          filter={filter}
          numArticles={articles.length}
        />
        {!sub[`${filter}Collapsed`] && (
          <>
            <Articles>
              {articles
                .filter((article) => !article.pending)
                .slice(0, sub.showArticles)
                .map((article) => (
                  <Article
                    key={article._id}
                    {...article}
                    descriptionHidden={sub.descriptionsHidden}
                  />
                ))}
            </Articles>
            {sub.showArticles < articles.length && (
              <ShowButton onClick={() => showMoreArticles(sub._id)}>
                Show more
              </ShowButton>
            )}
            {sub.showArticles > sub.maxArticles &&
              sub.maxArticles < articles.length && (
                <ShowButton onClick={() => showLessArticles(sub._id)}>
                  Show less
                </ShowButton>
              )}
          </>
        )}
      </Wrapper>
    );
  }
);

export default Subscription;
