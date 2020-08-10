import {
  collapseDefaultArticles,
  expandDefaultArticles,
  showLessDefaultArticles,
  showMoreDefaultArticles,
  moveDefaultSub,
  defaultArticleBookmarked,
  defaultArticleHidden,
} from "./defaultSubs";
import {
  collapseUserArticles,
  expandUserArticles,
  showLessUserArticles,
  showMoreUserArticles,
  moveUserSub,
  userArticleBookmarked,
  userArticleUnbookmarked,
  userArticleHidden,
} from "./user";

export * from "./app";
export * from "./defaultSubs";
export * from "./user";

export const collapseArticles = (subId, filter) => async (
  dispatch,
  getState
) => {
  if (getState().user.data) {
    dispatch(collapseUserArticles(subId, filter));
  } else {
    dispatch(collapseDefaultArticles(subId));
  }
};

export const expandArticles = (subId, filter) => async (dispatch, getState) => {
  if (getState().user.data) {
    dispatch(expandUserArticles(subId, filter));
  } else {
    dispatch(expandDefaultArticles(subId));
  }
};

export const showMoreArticles = (subId) => async (dispatch, getState) => {
  if (getState().user.data) {
    dispatch(showMoreUserArticles(subId));
  } else {
    dispatch(showMoreDefaultArticles(subId));
  }
};

export const showLessArticles = (subId) => async (dispatch, getState) => {
  if (getState().user.data) {
    dispatch(showLessUserArticles(subId));
  } else {
    dispatch(showLessDefaultArticles(subId));
  }
};

export const moveSub = (oldIndex, newIndex) => async (dispatch, getState) => {
  if (getState().user.data) {
    dispatch(moveUserSub(oldIndex, newIndex));
  } else {
    dispatch(moveDefaultSub(oldIndex, newIndex));
  }
};

export const articleBookmarked = (id) => async (dispatch, getState) => {
  if (getState().user.data) {
    dispatch(userArticleBookmarked(id));
  } else {
    dispatch(defaultArticleBookmarked(id));
  }
};

export const articleUnbookmarked = (id) => async (dispatch, getState) => {
  if (getState().user.data) {
    dispatch(userArticleUnbookmarked(id));
  }
};

export const articleHidden = (id) => async (dispatch, getState) => {
  if (getState().user.data) {
    dispatch(userArticleHidden(id));
  } else {
    dispatch(defaultArticleHidden(id));
  }
};
