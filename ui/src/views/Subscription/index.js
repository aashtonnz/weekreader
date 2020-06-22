import React from "react";
import { SortableElement } from "react-sortable-hoc";
import SubTitle from "../SubTitle";
import Article from "../Article";
import { filterArticles, calcArticlesLeft } from "./utils";
import { Wrapper, NoArticles, ShowButton, Articles } from "./styled";

const INIT_SHOW_ARTICLES = 3;

const Subscription = SortableElement(
  ({ sub, filter, showMoreArticles, showLessArticles }) => {
    const articles = filterArticles(sub.articles, filter);

    return (
      <Wrapper key={sub._id} filter={filter}>
        <SubTitle {...sub} filter={filter} numArticles={articles.length} />
        {!sub.collapsed && (
          <>
            {!articles.length ? (
              <NoArticles>—</NoArticles>
            ) : (
              <Articles>
                {articles.slice(0, sub.showArticles).map((article) => (
                  <Article
                    key={article._id}
                    {...article}
                    descriptionHidden={sub.descriptionsHidden}
                  />
                ))}
              </Articles>
            )}
            {sub.showArticles < articles.length && (
              <ShowButton onClick={() => showMoreArticles(sub._id)}>
                Show {calcArticlesLeft(sub, articles)} of {articles.length}
              </ShowButton>
            )}
            {sub.showArticles > INIT_SHOW_ARTICLES &&
              INIT_SHOW_ARTICLES < articles.length && (
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
