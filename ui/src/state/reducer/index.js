import { combineReducers } from "redux";
import user from "./user";
import app from "./app";
import defaultSubs from "./defaultSubs";

export default combineReducers({ user, app, defaultSubs });
