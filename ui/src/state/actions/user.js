import { setLoading, clearLoading, setAlert } from "./app";
import {
  CLEAR_USER,
  SET_TOKEN,
  SET_USER,
  SET_BOOKMARKED,
  SET_HIDDEN,
  SET_VISITED,
  SHOW_MORE_ARTICLES,
  SHOW_LESS_ARTICLES,
  MOVE_SUB,
  COLLAPSE_ARTICLES,
  EXPAND_ARTICLES,
} from "../reducer/actionTypes";
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
  const body = JSON.stringify({ email, password });
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
  const body = JSON.stringify({
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

export const articleVisited = (id) => async (dispatch) => {
  try {
    dispatch({ type: SET_VISITED, payload: id });
    await axios.post(`/articles/${id}/visited`);
  } catch (error) {
    dispatch(setAlert(reqErrorMsg(error), "danger"));
  }
};

export const articleHidden = (id) => async (dispatch) => {
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

export const articleBookmarked = (id) => async (dispatch) => {
  try {
    dispatch({ type: SET_BOOKMARKED, payload: { id, isBookmarked: true } });
    await axios.post(`/articles/${id}/bookmarked`);
  } catch (error) {
    dispatch(setAlert(reqErrorMsg(error), "danger"));
  }
};

export const articleUnbookmarked = (id) => async (dispatch) => {
  try {
    dispatch({ type: SET_BOOKMARKED, payload: { id, isBookmarked: false } });
    await axios.post(`/articles/${id}/unbookmarked`);
  } catch (error) {
    dispatch(setAlert(reqErrorMsg(error), "danger"));
  }
};

export const editSub = (id, title, img, descriptionsHidden, callback) => async (
  dispatch
) => {
  const loadId = dispatch(setLoading());
  try {
    if (img) {
      const formData = new FormData();
      formData.append("img", img);
      await axios.put(`/subscriptions/${id}/img`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }
    const body = JSON.stringify({ title, descriptionsHidden });
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

export const collapseUserArticles = (subId) => async (dispatch) => {
  try {
    dispatch({ type: COLLAPSE_ARTICLES, payload: subId });
    await axios.post(`/subscriptions/${subId}/collapse`);
  } catch (error) {
    dispatch(setAlert(reqErrorMsg(error), "danger"));
  }
};

export const expandUserArticles = (subId) => async (dispatch) => {
  try {
    dispatch({ type: EXPAND_ARTICLES, payload: subId });
    await axios.post(`/subscriptions/${subId}/expand`);
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
