const bcrypt = require("bcryptjs");
const config = require("config");
const moment = require("moment");
const User = require("../models/User");
const Channel = require("../models/Channel");
const subscriptionService = require("./subscription");

const DEFAULT_UPDATE_HOUR = 8;
const seeds = config.get("seeds");
const articleDurationDays = config.get("articleDurationDays");
const addMaxArticles = config.get("addMaxArticles");

const find = async (filter) => {
  const user = await User.find(filter).select("-password");
  return user;
};

const findById = async (id) => {
  const user = await User.findById(id).select("-password");
  return user;
};

const findOne = async (filter = {}) => {
  const user = await User.findOne(filter).select("-password");
  return user;
};

const exists = async (filter = {}) => {
  const user = await User.findOne(filter).select("-password");
  return Boolean(user);
};

const create = async (email, password, hourOffset) => {
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);
  const user = new User({
    email,
    articlesUpdateHour: (DEFAULT_UPDATE_HOUR - hourOffset + 24) % 24,
    password: passwordHash,
  });
  user.subscriptions = await subscriptionService.defaults();
  await user.save();
  return user;
};

const updateEmail = async (userId, email) => {
  const user = await User.findById(userId).select("-password");
  user.email = email;
  user.confirmed = false;
  await user.save();
  return user;
};

const updatePassword = async (userId, password) => {
  const user = await User.findById(userId).select("-password");
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);
  user.password = passwordHash;
  await user.save();
  return user;
};

const updateSettings = async (
  userId,
  articlesUpdateDays,
  articlesUpdateHour,
  mailSubscribed
) => {
  const user = await User.findById(userId).select("-password");
  user.articlesUpdateDays = articlesUpdateDays;
  user.articlesUpdateHour = articlesUpdateHour;
  user.mailSubscribed = mailSubscribed;
  await user.save();
  return user;
};

const updateArticles = async () => {
  const users = await User.find();
  const channels = await Channel.find();
  users.forEach((user) => {
    if (
      user.articlesUpdateDays.includes(moment().utc().day()) &&
      user.articlesUpdateHour === moment().utc().hour()
    ) {
      user.subscriptions.forEach((sub) => {
        if (!sub.isSubscribed) {
          return;
        }
        const channel = channels.find(
          (channel) => channel.rssUrl === sub.rssUrl
        );
        if (!channel) {
          console.error(`Channel not found: ${sub.rssUrl}`);
          return;
        }
        const titles = sub.articles.map((article) => article.title);
        const addArticles = channel.articles
          .filter((article) => !titles.includes(article.title))
          .slice(0, addMaxArticles);
        sub.articles = [...addArticles, ...sub.articles]
          .filter(
            (article) =>
              moment(article.publishedAt).isAfter(
                moment().subtract(articleDurationDays, "days")
              ) ||
              (article.bookmarked && !article.hidden)
          )
          .map((article) => {
            if (
              moment(article.publishedAt).isAfter(
                moment().subtract(articleDurationDays, "days")
              ) &&
              article.bookmarked
            ) {
              article.archived = true;
            }
            return article;
          });
      });
      user.prevArticlesUpdatedAt = user.articlesUpdatedAt;
      user.articlesUpdatedAt = new Date();
    }
  });
  await Promise.all(users.map(async (user) => await user.save()));
};

const validate = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    return null;
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return null;
  }
  const validUser = await User.findById(user._id).select("-password");
  return validUser;
};

const remove = async (userId) => {
  const user = await User.findById(userId).select("-password");
  if (!user) {
    return null;
  }
  await User.deleteOne({ _id: userId });
  return user;
};

const confirm = async (email) => {
  const user = await User.findOne({ email }).select("-password");
  user.confirmed = true;
  await user.save();
  return user;
};

const unsubscribe = async (email) => {
  const user = await User.findOne({ email }).select("-password");
  user.mailSubscribed = false;
  await user.save();
  return user;
};

const resetPassword = async (email, password) => {
  const user = await User.findOne({ email }).select("-password");
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);
  await user.save();
  return user;
};

const seed = async () => {
  const { users } = seeds;
  await Promise.all(
    users.map(
      async ({ email, password, hourOffset }) =>
        await create(email, password, hourOffset)
    )
  );
};

module.exports = {
  find,
  findById,
  findOne,
  exists,
  create,
  validate,
  remove,
  seed,
  updateSettings,
  updateArticles,
  updatePassword,
  updateEmail,
  confirm,
  unsubscribe,
  resetPassword,
};
