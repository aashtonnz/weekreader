import { setLoading, clearLoading, setAlert } from "./app";
import {
  SET_DEFAULT_SUBS,
  SHOW_MORE_DEFAULT_ARTICLES,
  SHOW_LESS_DEFAULT_ARTICLES,
  COLLAPSE_DEFAULT_ARTICLES,
  EXPAND_DEFAULT_ARTICLES,
  MOVE_DEFAULT_SUB,
  DEFAULT_SET_BOOKMARKED,
  DEFAULT_SET_HIDDEN,
} from "../reducer/actionTypes";
import { axios, reqErrorMsg } from "../../utils/requests";

export const setDefaultSubs = () => async (dispatch) => {
  const loadId = dispatch(setLoading());
  try {
    const res = await axios.get("/subscriptions/defaults");
    dispatch({ type: SET_DEFAULT_SUBS, payload: res.data });
  } catch (error) {
    dispatch(setAlert(reqErrorMsg(error), "danger"));
  } finally {
    dispatch(clearLoading(loadId));
  }
};

export const showMoreDefaultArticles = (subId) => (dispatch) => {
  dispatch({ type: SHOW_MORE_DEFAULT_ARTICLES, payload: subId });
};

export const showLessDefaultArticles = (subId) => (dispatch) => {
  dispatch({ type: SHOW_LESS_DEFAULT_ARTICLES, payload: subId });
};

export const collapseDefaultArticles = (subId) => (dispatch) => {
  dispatch({ type: COLLAPSE_DEFAULT_ARTICLES, payload: subId });
};

export const expandDefaultArticles = (subId) => (dispatch) => {
  dispatch({ type: EXPAND_DEFAULT_ARTICLES, payload: subId });
};

export const moveDefaultSub = (oldIndex, newIndex) => (dispatch) => {
  dispatch({
    type: MOVE_DEFAULT_SUB,
    payload: { oldIndex, newIndex },
  });
};

export const defaultArticleBookmarked = (id) => (dispatch) => {
  dispatch({
    type: DEFAULT_SET_BOOKMARKED,
    payload: { id, isBookmarked: true },
  });
  dispatch(setAlert("Bookmarked", null, 1500));
};

export const defaultArticleUnbookmarked = (id) => (dispatch) => {
  dispatch({
    type: DEFAULT_SET_BOOKMARKED,
    payload: { id, isBookmarked: false },
  });
  dispatch(setAlert("Unbookmarked", null, 1500));
};

export const defaultArticleHidden = (id) => (dispatch) => {
  dispatch({
    type: DEFAULT_SET_HIDDEN,
    payload: id,
  });
};
