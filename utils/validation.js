const { isEmail, isURL, isInt } = require("validator");
const filters = require("./filters");

const MIN_PASSWORD_LEN = 6;
const MAX_TITLE_LEN = 100;
const MAX_IMG_KB = 50;
const MAX_MAX_DAILY_ARTICLES = 10;

const checkSignup = (email, password, hourOffset) => {
  if (email && !isEmail(email)) {
    return "Invalid email address";
  }
  if (password.length < MIN_PASSWORD_LEN) {
    return `Password must contain ${MIN_PASSWORD_LEN} or more characters`;
  }
  if (!isInt(hourOffset.toString())) {
    return "Hour offset must be an integer";
  }
  return "";
};

const checkArticleUpdateDay = (day) => {
  if (!isInt(day.toString()) || day < 0 || 6 < day) {
    return "Invalid article update day";
  }
  return "";
};

const checkSettings = (articleUpdateDays, articleUpdateHour) => {
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
  return "";
};

const checkLogin = (email, password) => {
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

const checkSubEdit = (title, maxDailyArticles) => {
  if (!title) {
    return "Title is required";
  }
  if (title.length > MAX_TITLE_LEN) {
    return `Title must contain less than ${MAX_TITLE_LEN} characters`;
  }
  if (
    !isInt(maxDailyArticles.toString()) ||
    maxDailyArticles < 1 ||
    MAX_MAX_DAILY_ARTICLES < maxDailyArticles
  ) {
    return "Invalid max daily articles";
  }
  return "";
};

const checkPassword = (password) => {
  if (password.length < MIN_PASSWORD_LEN) {
    return `Password must contain ${MIN_PASSWORD_LEN} or more characters`;
  }
  return "";
};

const checkEmail = (email) => {
  if (!email) {
    return "Email address is required";
  }
  if (!isEmail(email)) {
    return "Invalid email address";
  }
  return "";
};

const checkFilter = (filter) => {
  if (!Object.values(filters).includes(filter)) {
    return "Invalid filter";
  }
  return "";
};

module.exports = {
  checkSignup,
  checkLogin,
  checkUrl,
  checkIndex,
  checkImg,
  checkSubEdit,
  checkEmail,
  checkPassword,
  checkSettings,
  checkFilter,
};
