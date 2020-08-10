import { INBOX, BOOKMARKED, HIDDEN } from "./filters";

export const filterArticles = (articles, filter) => {
  switch (filter) {
    case INBOX: {
      return articles.filter(
        (article) => !article.hidden && !article.archived && !article.bookmarked
      );
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
