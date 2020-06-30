const bcrypt = require("bcryptjs");
const config = require("config");
const moment = require("moment");
const uuid = require("uuid");
const User = require("../models/User");
const Channel = require("../models/Channel");
const subscriptionService = require("./subscription");
const mailService = require("./mail");

const seeds = config.get("seeds");
const articleDurationDays = config.get("articleDurationDays");

const find = async (filter) => {
  const user = await User.find(filter).select("-password");
  return user;
};

const findById = async (id) => {
  const user = await User.findById(id).select("-password");
  if (!user) {
    return null;
  }
  const userObj = user.toObject();
  userObj.mailSubscribed = await mailService.isSubscribed(user.email);
  return userObj;
};

const findOne = async (filter = {}) => {
  const user = await User.findOne(filter).select("-password");
  return user;
};

const exists = async (filter = {}) => {
  const user = await User.findOne(filter).select("-password");
  return Boolean(user);
};

const create = async (email, password) => {
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);
  const confirmId = uuid.v4();
  const user = new User({
    email,
    confirmId,
    password: passwordHash,
  });
  const subs = await subscriptionService.defaults();
  user.subscriptions = subs;
  await user.save();
  user.mailSubscribed = await mailService.isSubscribed(user.email);
  if (email) {
    await mailService.sendConfirm(user);
  }
  return user;
};

const update = async (
  userId,
  email,
  password,
  articleUpdateDays,
  articleUpdateHour,
  mailSubscribed
) => {
  const userData = {
    email,
    articleUpdate: { days: articleUpdateDays, hour: articleUpdateHour },
  };
  if (password) {
    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(password, salt);
  }
  const user = await User.findOneAndUpdate({ _id: userId }, userData, {
    new: true,
    upsert: true,
  }).select("-password");
  if (mailSubscribed) {
    await mailService.resubscribe(user.email);
  } else {
    await mailService.unsubscribe(user.email);
  }
  const userObj = user.toObject();
  userObj.mailSubscribed = await mailService.isSubscribed(user.email);
  return userObj;
};

const updateArticles = async () => {
  const users = await User.find();
  const channels = await Channel.find();
  users.forEach((user) => {
    if (
      user.articleUpdate.days.includes(moment().utc().day()) &&
      user.articleUpdate.hour === moment().utc().hour()
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
        const addArticles = channel.articles.filter(
          (article) => !titles.includes(article.title)
        );
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
      user.articleUpdate.updatedAt = new Date();
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

const confirmEmail = async (userId, confirmId) => {
  const user = await User.findById(userId).select("-password");
  if (!user) {
    return null;
  }
  if (user.confirmId !== confirmId) {
    return null;
  }
  user.confirmed = true;
  user.save();
  return user;
};

const seed = async () => {
  const { users } = seeds;
  await Promise.all(
    users.map(async ({ email, password }) => await create(email, password))
  );
};

module.exports = {
  find,
  findById,
  findOne,
  exists,
  create,
  update,
  validate,
  remove,
  seed,
  updateArticles,
  confirmEmail,
};
