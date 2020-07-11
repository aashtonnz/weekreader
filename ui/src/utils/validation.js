import { isEmail, isURL } from "validator";

const MIN_PASSWORD_LEN = 6;
const MAX_TITLE_LEN = 100;
const MAX_IMG_KB = 50;
const MAX_SUBS = 60;

export const checkSignup = (email, password, password2) => {
  if (email && !isEmail(email)) {
    return "Invalid email address";
  }
  if (password.length < MIN_PASSWORD_LEN) {
    return `Password must contain ${MIN_PASSWORD_LEN} or more characters`;
  }
  if (password !== password2) {
    return "Passwords do not match";
  }
  return "";
};

export const checkLogin = (email, password) => {
  if (!email) {
    return "Email address is required";
  }
  if (!password) {
    return "Password is required";
  }
  if (!isEmail(email) || password.length < MIN_PASSWORD_LEN) {
    return "Invalid credentials";
  }
  return "";
};

export const checkEmail = (email) => {
  if (!email) {
    return "Email address is required";
  }
  if (!isEmail(email)) {
    return "Invalid email address";
  }
};

export const checkPassword = (password, password2) => {
  if (password.length < MIN_PASSWORD_LEN) {
    return `Password must contain ${MIN_PASSWORD_LEN} or more characters`;
  }
  if (password !== password2) {
    return "Passwords do not match";
  }
  return "";
};

export const checkAdd = (user, rssUrl) => {
  const numSubs = user.subscriptions.filter((sub) => sub.isSubscribed).length;
  if (numSubs === MAX_SUBS) {
    return `Maximum of ${MAX_SUBS} feeds`;
  }
  if (!isURL(rssUrl)) {
    return "Invalid link";
  }
  return "";
};

export const checkEditSub = (title, file) => {
  if (!title) {
    return "Title is required";
  }
  if (title.length > MAX_TITLE_LEN) {
    return `Title must contain less than ${MAX_TITLE_LEN} characters`;
  }
  if (!file) {
    return "";
  }
  const extension = file.name.split(".").pop();
  if (!["jpg", "jpeg", "png", "ico"].includes(extension)) {
    return "Image type not valid";
  }
  if (file.size > MAX_IMG_KB * 1000) {
    return `Image must be less than ${MAX_IMG_KB} MB`;
  }
  return "";
};
