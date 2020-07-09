import arrayMove from "array-move";
import {
  SET_DEFAULT_SUBS,
  SHOW_MORE_DEFAULT_ARTICLES,
  SHOW_LESS_DEFAULT_ARTICLES,
  COLLAPSE_DEFAULT_ARTICLES,
  EXPAND_DEFAULT_ARTICLES,
  MOVE_DEFAULT_SUB,
  DEFAULT_SET_BOOKMARKED,
  DEFAULT_SET_HIDDEN,
} from "./actionTypes";

const INIT_SHOW_ARTICLES = 3;
const INC_SHOW_ARTICLES = 3;

const initialState = {
  data: null,
  collapsed: JSON.parse(localStorage.getItem("collapsed")) || [],
  bookmarked: JSON.parse(localStorage.getItem("bookmarked")) || [],
  hidden: JSON.parse(localStorage.getItem("hidden")) || [],
  positions: JSON.parse(localStorage.getItem("positions")) || [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_DEFAULT_SUBS: {
      payload.forEach((sub, index) => {
        const prevSub =
          state.data && state.data.find((prevSub) => prevSub._id === sub._id);
        sub.showArticles = prevSub ? prevSub.showArticles : INIT_SHOW_ARTICLES;
        const position = state.positions.findIndex((id) => id === sub._id);
        sub.index = position !== -1 ? position : index;
        sub.collapsed = state.collapsed.includes(sub._id);
        sub.articles.forEach((article) => {
          article.bookmarked = state.bookmarked.includes(article._id);
          article.hidden = state.hidden.includes(article._id);
        });
      });
      return { ...state, data: payload.sort((a, b) => a.index - b.index) };
    }
    case SHOW_MORE_DEFAULT_ARTICLES: {
      const newData = [...state.data];
      const sub = newData.find((sub) => sub._id === payload);
      sub.showArticles += INC_SHOW_ARTICLES;
      return { ...state, data: newData };
    }
    case SHOW_LESS_DEFAULT_ARTICLES: {
      const newData = [...state.data];
      const sub = newData.find((sub) => sub._id === payload);
      sub.showArticles = INIT_SHOW_ARTICLES;
      return { ...state, data: newData };
    }
    case COLLAPSE_DEFAULT_ARTICLES: {
      const newData = [...state.data];
      const sub = newData.find((sub) => sub._id === payload);
      sub.collapsed = true;
      sub.showArticles = INIT_SHOW_ARTICLES;
      const newCollapsed = [...state.collapsed, sub._id];
      localStorage.setItem("collapsed", JSON.stringify(newCollapsed));
      return {
        ...state,
        data: newData,
        collapsed: newCollapsed,
      };
    }
    case EXPAND_DEFAULT_ARTICLES: {
      const newData = [...state.data];
      const sub = newData.find((sub) => sub._id === payload);
      sub.collapsed = false;
      const newCollapsed = state.collapsed.filter((subId) => subId !== sub._id);
      localStorage.setItem("collapsed", JSON.stringify(newCollapsed));
      return {
        ...state,
        data: newData,
        collapsed: newCollapsed,
      };
    }
    case MOVE_DEFAULT_SUB: {
      const { oldIndex, newIndex } = payload;
      const newData = arrayMove([...state.data], oldIndex, newIndex);
      newData.forEach((sub, index) => (sub.index = index));
      const newPositions = [...newData]
        .sort((a, b) => a.index - b.index)
        .map((sub) => sub._id);
      localStorage.setItem("positions", JSON.stringify(newPositions));
      return { ...state, data: newData, positions: newPositions };
    }
    case DEFAULT_SET_BOOKMARKED: {
      const { id, isBookmarked } = payload;
      const newData = [...state.data];
      for (const sub of newData) {
        const article = sub.articles.find((article) => article._id === id);
        if (article) {
          article.bookmarked = isBookmarked;
        }
      }
      const newBookmarked = isBookmarked
        ? [...state.bookmarked, id]
        : state.bookmarked.filter((localId) => id !== localId);
      localStorage.setItem("bookmarked", JSON.stringify(newBookmarked));
      return {
        ...state,
        data: newData,
        bookmarked: newBookmarked,
      };
    }
    case DEFAULT_SET_HIDDEN: {
      const id = payload;
      const newData = [...state.data];
      for (const sub of newData) {
        const article = sub.articles.find((article) => article._id === id);
        if (article) {
          article.hidden = true;
        }
      }
      const newHidden = [...state.hidden, id];
      localStorage.setItem("hidden", JSON.stringify(newHidden));
      return {
        ...state,
        data: newData,
        hidden: newHidden,
      };
    }
    default: {
      return state;
    }
  }
};
