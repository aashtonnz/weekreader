const { isEmail, isURL, isInt } = require("validator");

const MIN_PASSWORD_LEN = 6;
const MAX_TITLE_LEN = 100;
const MAX_IMG_KB = 50;

const checkSignup = (email, password) => {
  if (email && !isEmail(email)) {
    return "Invalid email address";
  }
  if (password.length < MIN_PASSWORD_LEN) {
    return `Password must contain ${MIN_PASSWORD_LEN} or more characters`;
  }
  return "";
};

const checkArticleUpdateDay = (day) => {
  if (!isInt(day.toString()) || day < 0 || 6 < day) {
    return "Invalid article update day";
  }
  return "";
};

const checkUserEdit = (
  email,
  password,
  articleUpdateDays,
  articleUpdateHour
) => {
  if (
    !articleUpdateDays ||
    !articleUpdateDays.length ||
    articleUpdateDays.includes((day) => checkArticleUpdateDay(day))
  ) {
    return "Invalid article update days";
  }
  if (
    !isInt(articleUpdateHour.toString()) ||
    articleUpdateHour < 0 ||
    23 < articleUpdateHour
  ) {
    return "Invalid article update hour";
  }
  if (email && !isEmail(email)) {
    return "Invalid email address";
  }
  if (password && password.length < MIN_PASSWORD_LEN) {
    return `Password must contain ${MIN_PASSWORD_LEN} or more characters`;
  }
  return "";
};

const checkLogin = (email, password) => {
  if (!email) {
    return "Email is required";
  }
  if (!password) {
    return "Password is required";
  }
  if (!isEmail(email) || password.length < MIN_PASSWORD_LEN) {
    return "Invalid credentials";
  }
  return "";
};

const checkUrl = (rssUrl) => {
  if (!isURL(rssUrl)) {
    return "Invalid link";
  }
  return "";
};

const checkIndex = (index) => {
  if (!isInt(index.toString()) || index < 0) {
    return "Invalid index";
  }
  return "";
};

const checkImg = (file) => {
  const extension = file.name.split(".").pop();
  if (!["jpg", "jpeg", "png", "ico"].includes(extension)) {
    return "Image type not valid";
  }
  if (file.size > MAX_IMG_KB * 1000) {
    return `Image must be less than ${MAX_IMG_KB} MB`;
  }
  return "";
};

const checkTitle = (title) => {
  if (!title) {
    return "Title is required";
  }
  if (title.length > MAX_TITLE_LEN) {
    return `Title must contain less than ${MAX_TITLE_LEN} characters`;
  }
};

module.exports = {
  checkSignup,
  checkUserEdit,
  checkLogin,
  checkUrl,
  checkIndex,
  checkImg,
  checkTitle,
};
