const config = require("config");
const arrayMove = require("array-move");
const crypto = require("crypto");
const sharp = require("sharp");
const User = require("../models/User");
const Channel = require("../models/Channel");
const fileService = require("./file");
const channel = require("./channel");

const DEFAULT_IMG_HEIGHT = 24;
const MAX_SUBS = 60;
const seeds = config.get("seeds");
const maxDailyArticles = config.get("maxDailyArticles");

const subscribe = async (userId, channelId) => {
  const user = await User.findById(userId).select("-password");
  const channel = await Channel.findById(channelId);
  const numSubs = user.subscriptions.filter((sub) => sub.isSubscribed).length;
  if (numSubs === MAX_SUBS) {
    return user;
  }
  const sub = user.subscriptions.find(
    (sub) => sub.channel.toString() === channelId
  );
  if (sub) {
    sub.isSubscribed = true;
    sub.articles = channel.articles.slice(0, sub.maxDailyArticles);
  } else {
    const newSub = {
      channel,
      rssUrl: channel.rssUrl,
      title: channel.title,
      link: channel.link,
      imgKey: channel.imgKey,
      articles: channel.articles.slice(0, maxDailyArticles),
      description: channel.description,
    };
    user.subscriptions.unshift(newSub);
  }
  channel.numSubscribers++;
  await user.save();
  await channel.save();
  return user;
};

const defaults = async (mockId = false) => {
  const rssUrls = seeds.channels.map(({ rssUrl }) => rssUrl);
  const channels = await Channel.find({ rssUrl: { $in: rssUrls } });
  const subs = seeds.channels.map((seed, index) => {
    const channel = channels.find((channel) => channel.rssUrl === seed.rssUrl);
    const sub = {
      channel,
      isSubscribed: true,
      rssUrl: seed.rssUrl,
      title: seed.title || channel.title,
      link: channel.link,
      imgKey: seed.imgKey || channel.imgKey,
      articles: channel.articles.slice(0, maxDailyArticles),
      description: channel.description,
      descriptionsHidden: seed.descriptionsHidden,
    };
    if (mockId) {
      sub._id = String(index);
    }
    return sub;
  });
  return subs;
};

const collapse = async (userId, subId, filter) => {
  const user = await User.findById(userId).select("-password");
  const sub = user.subscriptions.id(subId);
  if (sub) {
    sub[`${filter}Collapsed`] = true;
    await user.save();
  }
  return user;
};

const expand = async (userId, subId, filter) => {
  const user = await User.findById(userId).select("-password");
  const sub = user.subscriptions.id(subId);
  if (sub) {
    sub[`${filter}Collapsed`] = false;
    await user.save();
  }
  return user;
};

const move = async (userId, oldIndex, newIndex) => {
  const user = await User.findById(userId).select("-password");
  user.subscriptions = arrayMove(user.subscriptions, oldIndex, newIndex);
  await user.save();
  return user;
};

const editImg = async (userId, subId, img) => {
  const user = await User.findById(userId).select("-password");
  const sub = user.subscriptions.id(subId);
  if (sub) {
    const imgName = crypto
      .createHash("md5")
      .update(userId + subId)
      .digest("hex");
    const imgKey = `subscription/${imgName}.${img.mimetype.split("/")[1]}`;
    const imgExt =
      img.mimetype === "image/x-icon" ? "ico" : img.mimetype.split("/")[1];
    let resizedImg = img.data;
    if (["png", "jpg", "jpeg", "gif"].includes(imgExt)) {
      resizedImg = await sharp(resizedImg)
        .resize({
          height: DEFAULT_IMG_HEIGHT,
        })
        .toBuffer();
    }
    await fileService.upload(resizedImg, imgKey, img.mimetype);
    sub.imgKey = imgKey;
    await user.save();
  }
  return user;
};

const edit = async (
  userId,
  subId,
  title,
  descriptionsHidden,
  maxDailyArticles
) => {
  const user = await User.findById(userId).select("-password");
  const sub = user.subscriptions.id(subId);
  if (sub) {
    sub.title = title;
    sub.descriptionsHidden = descriptionsHidden;
    sub.maxDailyArticles = maxDailyArticles;
    await user.save();
  }
  return user;
};

const unsubscribe = async (userId, subId) => {
  const user = await User.findById(userId).select("-password");
  const sub = user.subscriptions.id(subId);
  if (sub) {
    const channel = await Channel.findById(sub.channel);
    sub.isSubscribed = false;
    // Ensure number of subscribers cannot be negative
    if (channel.numSubscribers > 0) {
      channel.numSubscribers--;
    }
    await user.save();
    await channel.save();
  }
  return user;
};

module.exports = {
  subscribe,
  defaults,
  collapse,
  expand,
  move,
  editImg,
  edit,
  unsubscribe,
};
