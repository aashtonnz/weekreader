import {
  collapseDefaultArticles,
  expandDefaultArticles,
  showLessDefaultArticles,
  showMoreDefaultArticles,
  moveDefaultSub,
} from "./defaultSubs";
import {
  collapseUserArticles,
  expandUserArticles,
  showLessUserArticles,
  showMoreUserArticles,
  moveUserSub,
} from "./user";

export * from "./app";
export * from "./defaultSubs";
export * from "./user";

export const collapseArticles = (subId) => async (dispatch, getState) => {
  if (getState().user.data) {
    dispatch(collapseUserArticles(subId));
  } else {
    dispatch(collapseDefaultArticles(subId));
  }
};

export const expandArticles = (subId) => async (dispatch, getState) => {
  if (getState().user.data) {
    dispatch(expandUserArticles(subId));
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
