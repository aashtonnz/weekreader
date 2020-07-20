const config = require("config");
const moment = require("moment");
const MockUser = require("../models/MockUser");
const Channel = require("../models/Channel");
const subscriptionService = require("./subscription");

const articleDurationDays = config.get("articleDurationDays");
const addMaxArticles = config.get("addMaxArticles");

const find = async () => {
  const mockUser = await MockUser.findOne();
  return mockUser;
};

const create = async () => {
  const mockUser = new MockUser();
  mockUser.subscriptions = await subscriptionService.defaults();
  await mockUser.save();
  return mockUser;
};

const updateArticles = async () => {
  const mockUser = await MockUser.findOne();
  const channels = await Channel.find();
  mockUser.subscriptions.forEach((sub) => {
    const channel = channels.find((channel) => channel.rssUrl === sub.rssUrl);
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
  await mockUser.save();
};

module.exports = {
  find,
  create,
  updateArticles,
};
