import arrayMove from "array-move";
import {
  SET_DEFAULT_SUBS,
  SHOW_MORE_DEFAULT_ARTICLES,
  SHOW_LESS_DEFAULT_ARTICLES,
  COLLAPSE_DEFAULT_ARTICLES,
  EXPAND_DEFAULT_ARTICLES,
  MOVE_DEFAULT_SUB,
} from "./actionTypes";

const INIT_SHOW_ARTICLES = 3;
const INC_SHOW_ARTICLES = 3;

const initialState = null;

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_DEFAULT_SUBS: {
      payload.forEach((sub, index) => {
        const prevSub =
          state && state.find((prevSub) => prevSub._id === sub._id);
        sub.showArticles = prevSub ? prevSub.showArticles : INIT_SHOW_ARTICLES;
        sub.index = index;
      });
      return payload;
    }
    case SHOW_MORE_DEFAULT_ARTICLES: {
      const newState = [...state];
      const sub = state && state.find((sub) => sub._id === payload);
      sub.showArticles += INC_SHOW_ARTICLES;
      return newState;
    }
    case SHOW_LESS_DEFAULT_ARTICLES: {
      const newState = [...state];
      const sub = state && state.find((sub) => sub._id === payload);
      sub.showArticles = INIT_SHOW_ARTICLES;
      return newState;
    }
    case COLLAPSE_DEFAULT_ARTICLES: {
      const newState = [...state];
      const sub = newState.find((sub) => sub._id === payload);
      sub.collapsed = true;
      sub.showArticles = INIT_SHOW_ARTICLES;
      return newState;
    }
    case EXPAND_DEFAULT_ARTICLES: {
      const newState = [...state];
      const sub = newState.find((sub) => sub._id === payload);
      sub.collapsed = false;
      return newState;
    }
    case MOVE_DEFAULT_SUB: {
      const { oldIndex, newIndex } = payload;
      const newState = arrayMove([...state], oldIndex, newIndex);
      newState.forEach((sub, index) => (sub.index = index));
      return newState;
    }
    default: {
      return state;
    }
  }
};
