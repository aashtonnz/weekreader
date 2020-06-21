const RssParser = require("rss-parser");
const config = require("config");
const axios = require("axios");
const crypto = require("crypto");
const moment = require("moment");
const { sortBy, uniqBy } = require("lodash");
const Channel = require("../models/Channel");
const fileService = require("./file");
const { name, version } = require("../package.json");

const seeds = config.get("seeds");
const articleDurationDays = config.get("articleDurationDays");

const rssParser = new RssParser({
  headers: { "User-Agent": `${name} v${version}` },
  customFields: {
    feed: [["item", "feedItems", { keepArray: true }]],
    item: ["enclosure"],
  },
});

const find = async (filter = {}) => {
  const channels = await Channel.find(filter);
  return channels;
};

const findOne = async (filter = {}) => {
  const channel = await Channel.findOne(filter);
  return channel;
};

const exists = async (filter = {}) => {
  const channel = await Channel.findOne(filter);
  return Boolean(channel);
};

const uploadImg = async (imageUrl, rssUrl) => {
  try {
    const res = await axios.get(
      imageUrl || `${new URL(rssUrl).origin}/favicon.ico`,
      {
        responseType: "arraybuffer",
      }
    );
    const contentType = res.headers["content-type"];
    const imgExt =
      contentType === "image/x-icon" ? "ico" : contentType.split("/")[1];
    const imgName = crypto.createHash("md5").update(rssUrl).digest("hex");
    const imgKey = `channel/${imgName}.${imgExt}`;
    await fileService.upload(res.data, imgKey, contentType);
    return imgKey;
  } catch (error) {
    console.error(`No image for ${rssUrl}`);
    return null;
  }
};

const fetchArticles = async (channel) => {
  const { items } = await rssParser.parseURL(channel.rssUrl);
  if (!items) {
    return [];
  }
  const articles = items
    .filter(
      ({ title, isoDate }) =>
        title &&
        isoDate &&
        moment().add(1, "day").isAfter(isoDate) &&
        moment().subtract(1, "day").isAfter(isoDate)
    )
    .map(({ title, link, contentSnippet, enclosure, isoDate }) => ({
      title: title.trim(),
      link: link || (enclosure && enclosure.url) || channel.link,
      description: contentSnippet,
      publishedAt: isoDate,
    }));
  const uniqueArticles = uniqBy(articles, (article) => article.title);
  return sortBy(
    uniqueArticles,
    (article) => -moment(article.publishedAt).unix()
  );
};

const create = async (rssUrl) => {
  const { title, link, description, image } = await rssParser.parseURL(rssUrl);
  const imgKey = await uploadImg(image && image.url, rssUrl);
  const channel = new Channel({
    rssUrl,
    link,
    title,
    description,
    imgKey,
  });
  channel.articles = await fetchArticles(channel);
  await channel.save();
  return channel;
};

const updateArticles = async () => {
  const channels = await Channel.find();
  const fetchResults = await Promise.all(
    channels.map(async (channel) => {
      try {
        return await fetchArticles(channel);
      } catch (error1) {
        try {
          return await fetchArticles(channel);
        } catch (error2) {
          console.error(
            `Failed to fetch articles for ${channel.rssUrl}:\n  ${error1}"\n  ${error2}"`
          );
          return [];
        }
      }
    })
  );
  channels.forEach((channel, index) => {
    const titles = channel.articles.map((article) => article.title);
    const newArticles = fetchResults[index];
    const addArticles = newArticles.filter(
      (article) => !titles.includes(article.title)
    );
    channel.articles = [...addArticles, ...channel.articles].filter((article) =>
      moment(article.publishedAt).isAfter(
        moment().subtract(articleDurationDays, "days")
      )
    );
  });
  await Promise.all(channels.map(async (channel) => await channel.save()));
};

const seed = async () => {
  await Promise.all(
    seeds.channels.map(async ({ rssUrl }) => await create(rssUrl))
  );
};

module.exports = {
  find,
  findOne,
  exists,
  create,
  seed,
  updateArticles,
};
