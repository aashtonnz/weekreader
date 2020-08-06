import {
  SET_CONFIG,
  SET_ALERT,
  CLEAR_ALERT,
  SET_LOADING,
  CLEAR_LOADING,
} from "./actionTypes";

const initialState = {
  alert: null,
  config: null,
  loadingItems: [],
  isLoading: true,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CLEAR_ALERT: {
      if (payload && state.alert && payload !== state.alert.id) {
        return state;
      } else {
        return { ...state, alert: null };
      }
    }
    case CLEAR_LOADING: {
      const loadingItems = state.loadingItems.filter(
        (item) => item.id !== payload
      );
      const isLoading = Boolean(loadingItems.length);
      return { ...state, loadingItems, isLoading };
    }
    case SET_ALERT: {
      return { ...state, alert: payload };
    }
    case SET_LOADING: {
      const loadingItems = [...state.loadingItems, payload];
      return { ...state, loadingItems, isLoading: true };
    }
    case SET_CONFIG: {
      return { ...state, config: payload };
    }
    default: {
      return state;
    }
  }
};
