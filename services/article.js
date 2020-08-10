const User = require("../models/User");

const hidden = async (userId, articleId) => {
  const user = await User.findById(userId).select("-password");
  for (sub of user.subscriptions) {
    const article = sub.articles.id(articleId);
    if (article) {
      article.hidden = true;
      await user.save();
    }
  }
  return user;
};

const unhidden = async (userId, articleId) => {
  const user = await User.findById(userId).select("-password");
  for (sub of user.subscriptions) {
    const article = sub.articles.id(articleId);
    if (article) {
      article.hidden = false;
      await user.save();
    }
  }
  return user;
};

const bookmarked = async (userId, articleId) => {
  const user = await User.findById(userId).select("-password");
  for (sub of user.subscriptions) {
    const article = sub.articles.id(articleId);
    if (article) {
      article.bookmarked = true;
      await user.save();
    }
  }
  return user;
};

const unbookmarked = async (userId, articleId) => {
  const user = await User.findById(userId).select("-password");
  for (sub of user.subscriptions) {
    const article = sub.articles.id(articleId);
    if (article) {
      article.bookmarked = false;
      await user.save();
    }
  }
  return user;
};

module.exports = {
  hidden,
  unhidden,
  bookmarked,
  unbookmarked,
};
