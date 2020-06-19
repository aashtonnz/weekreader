import arrayMove from "array-move";
import {
  CLEAR_USER,
  SET_USER,
  SET_TOKEN,
  SET_BOOKMARKED,
  SET_HIDDEN,
  SET_VISITED,
  SHOW_MORE_ARTICLES,
  SHOW_LESS_ARTICLES,
  COLLAPSE_ARTICLES,
  EXPAND_ARTICLES,
  MOVE_SUB,
} from "./actionTypes";

const INIT_SHOW_ARTICLES = 3;
const INC_SHOW_ARTICLES = 3;

const initialState = {
  token: localStorage.getItem("token"),
  data: null,
  isAuthenticated: false,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CLEAR_USER: {
      localStorage.removeItem("token");
      return { token: null, data: null, isAuthenticated: false };
    }
    case SET_TOKEN: {
      localStorage.setItem("token", payload);
      return { ...state, token: payload, isAuthenticated: true };
    }
    case SET_USER: {
      payload.subscriptions.forEach((sub, index) => {
        const prevSub =
          state.data &&
          state.data.subscriptions.find((prevSub) => prevSub._id === sub._id);
        sub.showArticles = prevSub ? prevSub.showArticles : INIT_SHOW_ARTICLES;
        sub.index = index;
      });
      return { ...state, data: payload, isAuthenticated: true };
    }
    case SET_BOOKMARKED: {
      const { id, isBookmarked } = payload;
      const newData = { ...state.data };
      for (const sub of newData.subscriptions) {
        const article = sub.articles.find((article) => article._id === id);
        if (article) {
          article.bookmarked = isBookmarked;
        }
      }
      return {
        ...state,
        data: newData,
      };
    }
    case SET_HIDDEN: {
      const { id, isHidden } = payload;
      const newData = { ...state.data };
      for (const sub of newData.subscriptions) {
        const article = sub.articles.find((article) => article._id === id);
        if (article) {
          article.hidden = isHidden;
        }
      }
      return {
        ...state,
        data: newData,
      };
    }
    case SET_VISITED: {
      const newData = { ...state.data };
      for (const sub of newData.subscriptions) {
        const article = sub.articles.find((article) => article._id === payload);
        if (article) {
          article.visited = true;
        }
      }
      return {
        ...state,
        data: newData,
      };
    }
    case SHOW_MORE_ARTICLES: {
      const newData = { ...state.data };
      const sub = newData.subscriptions.find((sub) => sub._id === payload);
      sub.showArticles += INC_SHOW_ARTICLES;
      return { ...state, data: newData };
    }
    case SHOW_LESS_ARTICLES: {
      const newData = { ...state.data };
      const sub = newData.subscriptions.find((sub) => sub._id === payload);
      sub.showArticles = INIT_SHOW_ARTICLES;
      return { ...state, data: newData };
    }
    case COLLAPSE_ARTICLES: {
      const newData = { ...state.data };
      const sub = newData.subscriptions.find((sub) => sub._id === payload);
      sub.collapsed = true;
      sub.showArticles = INIT_SHOW_ARTICLES;
      return { ...state, data: newData };
    }
    case EXPAND_ARTICLES: {
      const newData = { ...state.data };
      const sub = newData.subscriptions.find((sub) => sub._id === payload);
      sub.collapsed = false;
      return { ...state, data: newData };
    }
    case MOVE_SUB: {
      const { oldIndex, newIndex } = payload;
      const newData = { ...state.data };
      newData.subscriptions = arrayMove(
        newData.subscriptions,
        oldIndex,
        newIndex
      );
      newData.subscriptions.forEach((sub, index) => (sub.index = index));
      return { ...state, data: newData };
    }
    default: {
      return state;
    }
  }
};
