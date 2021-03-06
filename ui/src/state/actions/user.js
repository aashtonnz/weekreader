import { setLoading, clearLoading, setAlert } from "./app";
import {
  CLEAR_USER,
  SET_TOKEN,
  SET_USER,
  SET_BOOKMARKED,
  SET_HIDDEN,
  SHOW_MORE_ARTICLES,
  SHOW_LESS_ARTICLES,
  MOVE_SUB,
  COLLAPSE_ARTICLES,
  EXPAND_ARTICLES,
} from "../reducer/actionTypes";
import moment from "moment";
import { axios, reqErrorMsg } from "../../utils/requests";
import setAuthToken from "../../utils/setAuthToken";

export const setUser = () => async (dispatch) => {
  setAuthToken();
  const loadId = dispatch(setLoading());
  try {
    const res = await axios.get("/users/me");
    dispatch({ type: SET_USER, payload: res.data });
  } catch (error) {
    dispatch({ type: CLEAR_USER });
  } finally {
    dispatch(clearLoading(loadId));
  }
};

export const signup = (email, password) => async (dispatch) => {
  const hourOffset = Math.floor(moment().utcOffset() / 60);
  const body = JSON.stringify({ email, password, hourOffset });
  const loadId = dispatch(setLoading());
  try {
    const res = await axios.post("/users", body);
    dispatch({ type: SET_TOKEN, payload: res.data.token });
    dispatch(setUser());
    dispatch(setAlert("Confirmation email sent"));
  } catch (error) {
    dispatch(setAlert(reqErrorMsg(error), "danger"));
    dispatch({ type: CLEAR_USER });
  } finally {
    dispatch(clearLoading(loadId));
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_USER });
};

export const login = (email, password) => async (dispatch) => {
  const body = JSON.stringify({ email, password });
  const loadId = dispatch(setLoading());
  try {
    const res = await axios.post("/users/login", body);
    dispatch({ type: SET_TOKEN, payload: res.data.token });
    dispatch(setUser());
  } catch (error) {
    dispatch(setAlert(reqErrorMsg(error), "danger"));
    dispatch({ type: CLEAR_USER });
  } finally {
    dispatch(clearLoading(loadId));
  }
};

export const editSettings = (
  articleUpdateHour,
  articleUpdateDays,
  mailSubscribed
) => async (dispatch) => {
  const hourOffset = Math.floor(moment().utcOffset() / 60);
  const body = JSON.stringify({
    hourOffset,
    articleUpdateHour,
    articleUpdateDays,
    mailSubscribed,
  });
  const loadId = dispatch(setLoading());
  try {
    const res = await axios.put("/users/settings", body);
    dispatch({ type: SET_USER, payload: res.data });
  } catch (error) {
    dispatch(setAlert(reqErrorMsg(error), "danger"));
  } finally {
    dispatch(clearLoading(loadId));
  }
};

export const editEmail = (email) => async (dispatch) => {
  const body = JSON.stringify({
    email,
  });
  const loadId = dispatch(setLoading());
  try {
    const res = await axios.put("/users/email", body);
    dispatch({ type: SET_USER, payload: res.data });
    dispatch(setAlert("Confirmation email sent"));
  } catch (error) {
    dispatch(setAlert(reqErrorMsg(error), "danger"));
  } finally {
    dispatch(clearLoading(loadId));
  }
};

export const editPassword = (password) => async (dispatch) => {
  const body = JSON.stringify({
    password,
  });
  const loadId = dispatch(setLoading());
  try {
    const res = await axios.put("/users/password", body);
    dispatch({ type: SET_USER, payload: res.data });
  } catch (error) {
    dispatch(setAlert(reqErrorMsg(error), "danger"));
  } finally {
    dispatch(clearLoading(loadId));
  }
};

export const deleteUser = () => async (dispatch) => {
  const loadId = dispatch(setLoading());
  try {
    await axios.delete("/users");
    dispatch({ type: CLEAR_USER });
  } catch (error) {
    dispatch(setAlert(reqErrorMsg(error), "danger"));
  } finally {
    dispatch(clearLoading(loadId));
  }
};

export const subscribe = (rssUrl) => async (dispatch) => {
  const body = JSON.stringify({ rssUrl });
  const loadId = dispatch(setLoading());
  try {
    const res = await axios.post("/subscriptions", body);
    dispatch({ type: SET_USER, payload: res.data });
  } catch (error) {
    dispatch(setAlert(reqErrorMsg(error), "danger"));
  } finally {
    dispatch(clearLoading(loadId));
  }
};

export const userArticleHidden = (id) => async (dispatch) => {
  try {
    dispatch({ type: SET_HIDDEN, payload: { id, isHidden: true } });
    await axios.post(`/articles/${id}/hidden`);
  } catch (error) {
    dispatch(setAlert(reqErrorMsg(error), "danger"));
  }
};

export const articleUnhidden = (id) => async (dispatch) => {
  try {
    dispatch({ type: SET_HIDDEN, payload: { id, isHidden: false } });
    await axios.post(`/articles/${id}/unhidden`);
  } catch (error) {
    dispatch(setAlert(reqErrorMsg(error), "danger"));
  }
};

export const userArticleBookmarked = (id) => async (dispatch) => {
  try {
    dispatch({ type: SET_BOOKMARKED, payload: { id, isBookmarked: true } });
    await axios.post(`/articles/${id}/bookmarked`);
    dispatch(setAlert("Bookmarked", null, 1500));
  } catch (error) {
    dispatch(setAlert(reqErrorMsg(error), "danger"));
  }
};

export const userArticleUnbookmarked = (id) => async (dispatch) => {
  try {
    dispatch({ type: SET_BOOKMARKED, payload: { id, isBookmarked: false } });
    await axios.post(`/articles/${id}/unbookmarked`);
    dispatch(setAlert("Unbookmarked", null, 1500));
  } catch (error) {
    dispatch(setAlert(reqErrorMsg(error), "danger"));
  }
};

export const editSub = (
  id,
  title,
  img,
  descriptionsHidden,
  maxArticles,
  callback
) => async (dispatch) => {
  const loadId = dispatch(setLoading());
  try {
    if (img) {
      const formData = new FormData();
      formData.append("img", img);
      await axios.put(`/subscriptions/${id}/img`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }
    const body = JSON.stringify({
      title,
      descriptionsHidden,
      maxArticles,
    });
    const res = await axios.put(`/subscriptions/${id}`, body);
    // Ensuring image cache is refreshed
    if (img) {
      const sub = res.data.subscriptions.find((sub) => sub._id === id);
      sub.imgKey += `?t=${Date.now()}`;
    }
    dispatch({ type: SET_USER, payload: res.data });
    callback();
  } catch (error) {
    dispatch(setAlert(reqErrorMsg(error), "danger"));
  } finally {
    dispatch(clearLoading(loadId));
  }
};

export const unsubscribe = (id, callback) => async (dispatch) => {
  const loadId = dispatch(setLoading());
  try {
    const res = await axios.post(`/subscriptions/${id}/unsubscribe`);
    dispatch({ type: SET_USER, payload: res.data });
    callback();
  } catch (error) {
    dispatch(setAlert(reqErrorMsg(error), "danger"));
  } finally {
    dispatch(clearLoading(loadId));
  }
};

export const showMoreUserArticles = (subId) => (dispatch) => {
  dispatch({ type: SHOW_MORE_ARTICLES, payload: subId });
};

export const showLessUserArticles = (subId) => (dispatch) => {
  dispatch({ type: SHOW_LESS_ARTICLES, payload: subId });
};

export const collapseUserArticles = (subId, filter) => async (dispatch) => {
  const body = JSON.stringify({ filter });
  try {
    dispatch({ type: COLLAPSE_ARTICLES, payload: { subId, filter } });
    await axios.post(`/subscriptions/${subId}/collapse`, body);
  } catch (error) {
    dispatch(setAlert(reqErrorMsg(error), "danger"));
  }
};

export const expandUserArticles = (subId, filter) => async (dispatch) => {
  const body = JSON.stringify({ filter });
  try {
    dispatch({ type: EXPAND_ARTICLES, payload: { subId, filter } });
    await axios.post(`/subscriptions/${subId}/expand`, body);
  } catch (error) {
    dispatch(setAlert(reqErrorMsg(error), "danger"));
  }
};

export const moveUserSub = (oldIndex, newIndex) => async (dispatch) => {
  try {
    const body = JSON.stringify({ oldIndex, newIndex });
    dispatch({ type: MOVE_SUB, payload: { oldIndex, newIndex } });
    await axios.post(`/subscriptions/move`, body);
  } catch (error) {
    dispatch(setAlert(reqErrorMsg(error), "danger"));
  }
};

export const confirm = (token) => async (dispatch) => {
  const body = JSON.stringify({ token });
  const loadId = dispatch(setLoading());
  try {
    await axios.post("/users/confirm", body);
  } catch (error) {
    dispatch(setAlert(reqErrorMsg(error), "danger"));
  } finally {
    dispatch(clearLoading(loadId));
  }
};

export const mailUnsubscribe = (token) => async (dispatch) => {
  const body = JSON.stringify({ token });
  const loadId = dispatch(setLoading());
  try {
    await axios.post("/users/unsubscribe", body);
  } catch (error) {
    dispatch(setAlert(reqErrorMsg(error), "danger"));
  } finally {
    dispatch(clearLoading(loadId));
  }
};

export const resetPasswordEmail = (email) => async (dispatch) => {
  const body = JSON.stringify({ email });
  const loadId = dispatch(setLoading());
  try {
    await axios.post(`/users/reset-password-email`, body);
    dispatch(setAlert("Password reset sent"));
  } catch (error) {
    dispatch(setAlert(reqErrorMsg(error), "danger"));
  } finally {
    dispatch(clearLoading(loadId));
  }
};

export const resetPassword = (token, password) => async (dispatch) => {
  const body = JSON.stringify({ token, password });
  const loadId = dispatch(setLoading());
  try {
    await axios.post(`/users/reset-password`, body);
  } catch (error) {
    dispatch(setAlert(reqErrorMsg(error), "danger"));
  } finally {
    dispatch(clearLoading(loadId));
  }
};
