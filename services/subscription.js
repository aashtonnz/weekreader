const config = require("config");
const arrayMove = require("array-move");
const crypto = require("crypto");
const User = require("../models/User");
const Channel = require("../models/Channel");
const fileService = require("./file");

const MAX_SUBS = 60;
const seeds = config.get("seeds");
const addMaxArticles = config.get("addMaxArticles");

const subscribe = async (userId, channel) => {
  const user = await User.findById(userId).select("-password");
  const numSubs = user.subscriptions.filter((sub) => sub.isSubscribed).length;
  if (numSubs === MAX_SUBS) {
    return user;
  }
  const sub = user.subscriptions.find(
    (sub) => sub.channel.toString() === channel._id.toString()
  );
  if (sub) {
    sub.isSubscribed = true;
  } else {
    const newSub = {
      channel,
      rssUrl: channel.rssUrl,
      title: channel.title,
      link: channel.link,
      imgKey: channel.imgKey,
      articles: channel.articles,
      description: channel.description,
    };
    user.subscriptions.unshift(newSub);
  }
  await user.save();
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
      articles: channel.articles.slice(0, addMaxArticles),
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
    await fileService.upload(img.data, imgKey, img.mimetype);
    sub.imgKey = imgKey;
    await user.save();
  }
  return user;
};

const edit = async (userId, subId, title, descriptionsHidden) => {
  const user = await User.findById(userId).select("-password");
  const sub = user.subscriptions.id(subId);
  if (sub) {
    sub.title = title;
    sub.descriptionsHidden = descriptionsHidden;
    await user.save();
  }
  return user;
};

const unsubscribe = async (userId, subId) => {
  const user = await User.findById(userId).select("-password");
  const sub = user.subscriptions.id(subId);
  if (sub) {
    sub.isSubscribed = false;
    await user.save();
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
