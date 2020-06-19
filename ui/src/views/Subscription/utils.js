import { INBOX, BOOKMARKED, HIDDEN } from "./filters";

const INC_SHOW_ARTICLES = 3;

export const filterArticles = (articles, filter) => {
  switch (filter) {
    case INBOX: {
      return articles.filter((article) => !article.hidden && !article.archived);
    }
    case BOOKMARKED: {
      return articles.filter(
        (article) => article.bookmarked && !article.hidden
      );
    }
    case HIDDEN: {
      return articles.filter((article) => article.hidden);
    }
    default: {
      return articles;
    }
  }
};

export const calcArticlesLeft = (sub, articles) => {
  return Math.min(sub.showArticles + INC_SHOW_ARTICLES, articles.length);
};
