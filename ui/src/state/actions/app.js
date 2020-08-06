import uuid from "uuid";
import {
  SET_ALERT,
  CLEAR_ALERT,
  SET_LOADING,
  CLEAR_LOADING,
  SET_CONFIG,
} from "../reducer/actionTypes";
import { axios, reqErrorMsg } from "../../utils/requests";

const ALERT_TIMEOUT_MS = 5000;

export const setAlert = (msg, status, timeout = ALERT_TIMEOUT_MS) => (
  dispatch
) => {
  const id = uuid.v4();
  dispatch({ type: SET_ALERT, payload: { msg, status, id } });
  setTimeout(() => dispatch(clearAlert(id)), timeout);
};

export const clearAlert = (id = null) => (dispatch, getState) => {
  if (getState().app.alert) {
    dispatch({ type: CLEAR_ALERT, payload: id });
  }
};

export const setLoading = () => (dispatch) => {
  const id = uuid.v4();
  dispatch({ type: SET_LOADING, payload: { id } });
  return id;
};

export const clearLoading = (id) => (dispatch, getState) => {
  if (getState().app.isLoading) {
    dispatch({ type: CLEAR_LOADING, payload: id });
  }
};

export const setConfig = () => async (dispatch) => {
  const loadId = dispatch(setLoading());
  try {
    const res = await axios.get("/config");
    dispatch({ type: SET_CONFIG, payload: res.data });
  } catch (error) {
    dispatch(setAlert(reqErrorMsg(error), "danger"));
  } finally {
    dispatch(clearLoading(loadId));
  }
};
